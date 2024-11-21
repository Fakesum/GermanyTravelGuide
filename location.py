import flask
from flask_cors import CORS
import json
from time import time, sleep
import socket
import threading
from random import sample as random_sample
from requests import post as post_request
from seleniumbase import SB, BaseCase
from selenium.webdriver.chrome.webdriver import WebDriver as InnerDriver
import atexit

class LocationRatingSystem(threading.Thread):
    CHECK_SEARCH_RESULTS = 0
    def __init__(self, port=None):
        super().__init__(daemon=True)
        self.daemon = True

        if port == None:
            with socket.socket() as sock:
                sock.bind(('', 0))
                self._port = sock.getsockname()[1]
        else:
            self._port = port
        
        self._sb = SB(uc=True, headed=True)
        self.driver: BaseCase = self._sb.__enter__()
        self.inner_driver: InnerDriver = self.driver.driver

    def _add_id_to_req(self, req: list[dict], _id: str, _sys_id: str):
        for r in req:
            r.update({"id": _id if r["role"] == "user" else _sys_id})
    
    def _black_box_req(self, req: list[dict]):
        
        _id = ''.join(random_sample("qwertyuiopasdfghjklzxcvbnm1234567890", k=7))
        _sys_id = ''.join(random_sample("qwertyuiopasdfghjklzxcvbnm1234567890", k=7))

        self._add_id_to_req(req, _id, _sys_id)

        return post_request("https://www.blackbox.ai/api/chat", json={
            "messages": req,
            "id": _id,
            "previewToken": None,
            "userId": None,
            "codeModelMode": True,
            "agentMode": {},
            "trendingAgentMode": {},
            "isMicMode": False,
            "userSystemPrompt": None,
            "maxTokens": 8192,
            "playgroundTopP": 0.9,
            "playgroundTemperature": 0.5,
            "isChromeExt": False,
            "githubToken": None,
            "clickedAnswer2": False,
            "clickedAnswer3": False,
            "clickedForceWebSearch": False,
            "visitFromDelta": False,
            "mobileClient": False,
            "userSelectedModel": "gpt-4o"
        })
    
    def _search_results(self, q):
        self.driver.get(f"https://www.google.com/search?q={q}")

        while not self.driver.execute_script('''return ((document.readyState == "interactive") || (document.readyState == "complete"))'''):
            sleep(0.1)
        
        query = self.driver.execute_script("return document.body.innerText;").replace('\n', '')

        for url in self.driver.execute_script('''var urls = [];document.querySelectorAll('span[jscontroller] > a').forEach(res => {urls.push(res.href)});return urls;''')[:self.CHECK_SEARCH_RESULTS]:
            while True:
                try:
                    self.driver.get(url)
                except:
                    self.driver.switch_to_default_content()
                    self.driver.switch_to_default_window()
                else:
                    break
            
            st = time()
            while (time() - st) < 1:
                try:
                    query += self.driver.execute_script("return document.body.innerText;").replace('\n', '')
                except:
                    pass
                else:
                    break
        return query
    
    def run(self):
        app = flask.Flask(__name__)
        CORS(app)

        @app.route("/location/<location_id>")
        def send_location(location_id):
            result = self._black_box_req([
                {
                    "role": "user",
                    "content": """given a location and a google search result, respond only in json format, give a variety of scories to the location depending on how good it would be to travel to the place at this point of time. example given Sunny Beach {name: "Sunny Beach",overallScore: 85,ratings: [{ category: "Safety", score: 90 },{ category: "Attractions", score: 80 },{ category: "Food", score: 85 },{ category: "Transportation", score: 75 },],currentEvents: [{ title: "Summer Festival", description: "Annual music and arts festival on the beach." },{ title: "Food Fair", description: "Try local cuisines from various restaurants." },{ title: "Surfing Competition", description: "Watch professional surfers compete." },],}"""
                },
                {
                    "role": "assistant",
                    "content": """Understood given, Sunny Beach answer given will be: {name: "Sunny Beach",overallScore: 85,ratings: [{ category: "Safety", score: 90 },{ category: "Attractions", score: 80 },{ category: "Food", score: 85 },{ category: "Transportation", score: 75 },],currentEvents: [{ title: "Summer Festival", description: "Annual music and arts festival on the beach." },{ title: "Food Fair", description: "Try local cuisines from various restaurants." },{ title: "Surfing Competition", description: "Watch professional surfers compete." },],}"""
                },
                {
                    "role": "user",
                    "content": f"{location_id}, search result: {self._search_results(location_id)}"
                }
            ]).text

            res = result.replace('$@$v=undefined-rv1$@$', '').replace("```json", "").replace("```", "").replace('Generated by BLACKBOX.AI, try unlimited chat https://www.blackbox.ai', "")
            res = json.dumps(json.loads(res))
            print(res)
            return res, 200

        app.run(port=self._port)
    
    def start(self):
        super().start()
        return self._port

    def __del__(self):
        self._sb.__exit__(None, None, None)

location_rating_system = LocationRatingSystem(3030)
port = location_rating_system.start()
print(f"Started at port: {port}")
@atexit.register
def deler():
    location_rating_system.__del__()
input()