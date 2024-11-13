import React, { useEffect, useReducer, useState, useRef, useCallback } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, Popup, useMap, GeoJSON } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from './card'

import { Helmet } from 'react-helmet';
import germanyGeoJson from './germany.json'

// import { ScatterBoxLoader } from "react-awesome-loaders"

const map_theme_urls = ["https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"];

var map_theme_url = map_theme_urls[0];

// change this in order to change the side cards.

const city_markers = [{
    name: "Berlin",
    cords: [52.537300, 13.356085],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Berlin'
  },
  
  {
    name: "Hamburg",
    cords: [53.551086, 9.993682],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Hamburg'
  },
  
  {
    name: "Munich",
    cords: [48.135125, 11.581981],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Munich'
  },
  
  {
    name: "Cologne",
    cords: [50.937531, 6.960279],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Cologne'
  },
  
  {
    name: "Frankfurt",
    cords: [50.110924, 8.682127],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Frankfurt'
  },
  
  {
    name: "Stuttgart",
    cords: [48.775845, 9.182932],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Stuttgart'
  },
  
  {
    name: "Düsseldorf",
    cords: [51.227741, 6.773456],
    wikipedia_url: 'https://en.wikipedia.org/wiki/D%C3%BCsseldorf'
  },
  
  {
    name: "Dortmund",
    cords: [51.513587, 7.465298],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Dortmund'
  },
  
  {
    name: "Essen",
    cords: [51.456573, 7.011555],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Essen'
  },
  
  {
    name: "Leipzig",
    cords: [51.339695, 12.373075],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Leipzig'
  },
  
  {
    name: "Bremen",
    cords: [53.079296, 8.801694],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Bremen'
  },
  
  {
    name: "Dresden",
    cords: [51.050407, 13.737262],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Dresden'
  },
  
  {
    name: "Hannover",
    cords: [52.375892, 9.732010],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Hannover'
  },
  
  {
    name: "Nuremberg",
    cords: [49.452101, 11.078125],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Nuremberg'
  },
  
  {
    name: "Mannheim",
    cords: [49.487459, 8.466039],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Mannheim'
  },
  
  {
    name: "Karlsruhe",
    cords: [49.006890, 8.403653],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Karlsruhe'
  },
  
  {
    name: "Augsburg",
    cords: [48.401100, 10.898400],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Augsburg'
  },
  
  {
    name: "Wiesbaden",
    cords: [50.082130, 8.249370],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Wiesbaden'
  },
  
  {
    name: "Gelsenkirchen",
    cords: [51.517724, 7.083333],
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gelsenkirchen'
  }
];

const uni_markers = [
  {
    name: "Free University of Berlin",
    cords: [52.454406, 13.293498],
    wikipedia_url: "https://en.wikipedia.org/wiki/Free_University_of_Berlin"
  },
  
  {
    name: "Humboldt University of Berlin",
    cords: [52.532200, 13.384300],
    wikipedia_url: "https://en.wikipedia.org/wiki/Humboldt_University_of_Berlin"
  },
  
  {
    name: "Technical University of Munich",
    cords: [48.150000, 11.580000],
    wikipedia_url: "https://en.wikipedia.org/wiki/Technical_University_of_Munich"
  },
  
  {
    name: "Ludwig Maximilian University of Munich",
    cords: [48.150000, 11.580000],
    wikipedia_url: "https://en.wikipedia.org/wiki/Ludwig_Maximilian_University_of_Munich"
  },
  
  {
    name: "University of Mannheim",
    cords: [49.487459, 8.466039],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Mannheim"
  },
  
  {
    name: "University of Freiburg",
    cords: [47.999007, 7.842104],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Freiburg"
  },
  
  {
    name: "University of Heidelberg",
    cords: [49.398348, 8.672200],
    wikipedia_url: "https://en.wikipedia.org/wiki/Heidelberg_University"
  },
  
  {
    name: "RWTH Aachen University",
    cords: [50.776500, 6.083900],
    wikipedia_url: "https://en.wikipedia.org/wiki/RWTH_Aachen_University"
  },
  
  {
    name: "University of Stuttgart",
    cords: [48.775845, 9.182932],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Stuttgart"
  },
  
  {
    name: "University of Göttingen",
    cords: [51.541280, 9.940000],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_G%C3%B6ttingen"
  },
  
  {
    name: "University of Tübingen",
    cords: [48.520000, 9.053000],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_T%C3%BCbingen"
  },
  
  {
    name: "University of Hamburg",
    cords: [53.550000, 9.993682],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Hamburg"
  },
  
  {
    name: "University of Leipzig",
    cords: [51.339695, 12.373075],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Leipzig"
  },
  
  {
    name: "University of Mannheim",
    cords: [49.487459, 8.466039],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Mannheim"
  },
  
  {
    name: "University of Duisburg-Essen",
    cords: [51.455643, 7.011555],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Duisburg-Essen"
  },
  
  {
    name: "University of Paderborn",
    cords: [51.712000, 8.748000],
    wikipedia_url: "https://en.wikipedia.org/wiki/University_of_Paderborn"
  }
];

const interesting_places = [
  {
    name: "Neuschwanstein Castle",
    cords: [47.55769346554385, 10.74977894232872],
    wikipedia_url: "https://en.wikipedia.org/wiki/Neuschwanstein_Castle",
    facts: [
      "The Neuschwanstein castle was built for only one person – King Ludwig II.",
      "Neuschwanstein is so immense that on some days, it is visited by up to 6000 tourists.",
      "Ludwig slept only 11 nights in the castle. Ludwig was Richard Wagner's patron."
    ]
  },
  {
    name: "Brandenburg Gate",
    cords: [52.516275, 13.377704],
    wikipedia_url: "https://en.wikipedia.org/wiki/Brandenburg_Gate",
    facts: [
      "The Brandenburg Gate is an 18th-century neoclassical monument in Berlin.",
      "It is one of the most famous landmarks in Germany and a symbol of reunification.",
      "The gate was commissioned by Frederick William II of Prussia."
    ]
  },
  {
    name: "Cologne Cathedral",
    cords: [50.941278, 6.958281],
    wikipedia_url: "https://en.wikipedia.org/wiki/Cologne_Cathedral",
    facts: [
      "Cologne Cathedral is a UNESCO World Heritage Site and one of the largest cathedrals in Europe.",
      "Construction began in 1248 and was completed in 1880.",
      "The cathedral's twin spires are among the tallest in the world."
    ]
  },
  {
    name: "Berlin Wall",
    cords: [52.516275, 13.378220],
    wikipedia_url: "https://en.wikipedia.org/wiki/Berlin_Wall",
    facts: [
      "The Berlin Wall divided East and West Berlin from 1961 to 1989.",
      "It was a powerful symbol of the Cold War and the division of Germany.",
      "Today, remnants of the wall serve as a memorial and historical site."
    ]
  },
  {
    name: "Heidelberg Castle",
    cords: [49.4102, 8.7150],
    wikipedia_url: "https://en.wikipedia.org/wiki/Heidelberg_Castle",
    facts: [
      "Heidelberg Castle is a ruin located on a hill overlooking the city of Heidelberg.",
      "It is one of the most important Renaissance structures in Germany.",
      "The castle has been a site of many historical events and is a popular tourist destination."
    ]
  },
  {
    name: "Black Forest",
    cords: [48.0009, 8.0002],
    wikipedia_url: "https://en.wikipedia.org/wiki/Black_Forest",
    facts: [
      "The Black Forest is a mountainous region in southwestern Germany.",
      "It is known for its dense forests, picturesque villages, and cuckoo clocks.",
      "The region is also famous for its Black Forest cake."
    ]
  },
  {
    name: "Dachau Concentration Camp Memorial Site",
    cords: [48.2622, 11.4369],
    wikipedia_url: "https://en.wikipedia.org/wiki/Dachau_concentration_camp",
    facts: [
      "Dachau was the first Nazi concentration camp opened in Germany.",
      "It served as a model for other concentration camps during the Holocaust.",
      "Today, it is a memorial site dedicated to the victims of the Holocaust."
    ]
  },
  {
    name: "Miniatur Wunderland",
    cords: [53.5505, 9.9937],
    wikipedia_url: "https://en.wikipedia.org/wiki/Miniatur_Wunderland",
    facts: [
      "Miniatur Wunderland is the world's largest model railway exhibition, located in Hamburg.",
      "It features incredibly detailed miniature landscapes and cities.",
      "The exhibition has been continuously expanded since its opening in 2001."
    ]
  },
  {
    name: "Neuschwanstein Castle",
    cords: [47.55769346554385, 10.74977894232872],
    wikipedia_url: "https://en.wikipedia.org/wiki/Neuschwanstein_Castle",
    facts: [
      "The Neuschwanstein castle was built for only one person – King Ludwig II.",
      "Neuschwanstein is so immense that on some days, it is visited by up to 6000 tourists.",
      "Ludwig slept only 11 nights in the castle. Ludwig was Richard Wagner's patron."
    ]
  },
  {
    name: "Zugspitze",
    cords: [47.4210, 10.9820],
    wikipedia_url: "https ://en.wikipedia.org/wiki/Zugspitze",
    facts: [
      "Zugspitze is the highest peak in Germany, standing at 2,962 meters (9,718 feet).",
      "It offers stunning views of the Alps and is a popular destination for skiing and hiking.",
      "The Zugspitze glacier allows for year-round skiing."
    ]
  },
  {
    name: "Sanssouci Palace",
    cords: [52.3984, 13.0420],
    wikipedia_url: "https://en.wikipedia.org/wiki/Sanssouci",
    facts: [
      "Sanssouci Palace is a former summer palace of Frederick the Great, King of Prussia.",
      "It is located in Potsdam and is known for its beautiful gardens and Rococo architecture.",
      "The palace is a UNESCO World Heritage Site."
    ]
  },
  {
    name: "Nuremberg Castle",
    cords: [49.4572, 11.0775],
    wikipedia_url: "https://en.wikipedia.org/wiki/Nuremberg_Castle",
    facts: [
      "Nuremberg Castle is a medieval castle located in the city of Nuremberg.",
      "It was one of the most important imperial palaces of the Holy Roman Empire.",
      "The castle offers panoramic views of the city."
    ]
  },
  {
    name: "Rhine Valley",
    cords: [50.0833, 7.6167],
    wikipedia_url: "https://en.wikipedia.org/wiki/Rhine_Valley",
    facts: [
      "The Rhine Valley is famous for its picturesque landscapes, vineyards, and castles.",
      "It is a UNESCO World Heritage Site and a popular destination for river cruises.",
      "The valley is known for its charming towns like Rüdesheim and Bacharach."
    ]
  },
  {
    name: "Oberammergau",
    cords: [47.6000, 11.1333],
    wikipedia_url: "https://en.wikipedia.org/wiki/Oberammergau",
    facts: [
      "Oberammergau is known for its Passion Play, performed every ten years since 1634.",
      "The town is famous for its woodcarving and painted houses.",
      "It is located in the Bavarian Alps and offers beautiful hiking trails."
    ]
  }
];

function ChangeCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom)
    map.setView(center);
  }, [center, map]);
  return null;
}

var university_mode = false;

function App() {
  
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState([51.132629, 10.364192]);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  
  var mapStyles = (feature) => {
    return {
      fillColor: feature.properties.name === 'Germany' ? 'transparent' : 'darkgray',
      weight: 2,
      opacity: 1,
      color: 'red',
      dashArray: '9',
      fillOpacity: 0.0,
    };
  };

  function showStreets(e){

    if (e.code == "Enter"){
      if (document.querySelector(".address-input").value == ""){
        return; // Cause OH God it crashes, And I have no idea WHY!!!.
      }
      setSearchLoading(true);
      
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${document.querySelector(".address-input").value}&limit=5&appid=da00953907b5ec2c5db00f53ffd89e68`)
        .then(res => {if (res.cod == 400){return [];}; return res.json()})
        .then(res => {if (res != []){
          locations_hidden = false;
          search_locations = res;
          setSearchLoading(false);
        }})
        .catch(e=>{});
        forceUpdate();
    }
  }

  const bounds = [
    [35.0, -25.0], // Southwest corner (approx)
    [70.0, 40.0]   // Northeast corner (approx)
  ];

  const getIcon = (color) => {
      return new L.Icon({
        iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36" fill="%23${color}"><path d="M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>`,
        iconSize: [24, 36], // size of the icon
        iconAnchor: [12, 36], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -36], // point from which the popup should open relative to the iconAnchor
      });
    }

  const marker_function = (name, cords, wikipedia_url, icon, i) => {
    var result = (
      <div key={`marker-${i}`}>
        <Marker icon={icon} position={cords}><Tooltip>{name}</Tooltip>
          <Popup
            maxWidth={400}
          >
            <iframe 
              style={{border: 'none'}}
              width="400"
              height="300"
              src={wikipedia_url}
            ></iframe>
          </Popup>
        </Marker>
      </div>
    );
    return result;
  }

  const [hoveredCard, setHoveredCard] = useState(null)

  const handleCardInteraction = (index) => {
    setHoveredCard(index)
  }

  const cards = [
    { title: "Berlin Wall", content: "The Berlin Wall guarded concrete barrier that encircled West Berlin from 1961 to 1989, separating it from East Berlin and the German Democratic Republic Construction of the Berlin Wall was commenced by the government of the GDR on 13 August 1961. It included guard towers placed along large concrete walls", cords: [52.516275, 13.378220]},
  ]

  return (
    <div className="App">
      <Helmet>
        <title>German Travel Site</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Helmet>
      <MapContainer center={center} zoom={zoom} maxBounds={bounds} minZoom={zoom} maxZoom={zoom}>
      <div style={{display: 'grid'}}>
        <button
          style={{zIndex: 500, position: 'absolute', justifySelf: 'right', background: 'white', borderRadius: '5px', padding: '3px'}}
          onClick={() => {university_mode = !university_mode;forceUpdate();}}>
            Switch to {university_mode ? 'Cities' : "Universities"}
        </button>
      </div>
    <div className="relative min-h-screen overflow-hidden">
      {cards.map((card, index) => {
        const isLeft = index < 3
        const verticalPosition = `${(index % 3) * 33 + 16}%`
        
        return (
          <Card 
            key={index}
            className={`
              absolute w-64 transition-all duration-300 ease-in-out cursor-pointer
              ${isLeft ? 'left-0' : 'right-0'}
              ${hoveredCard === index ? (isLeft ? 'translate-x-0' : '-translate-x-0') : (isLeft ? '-translate-x-56' : 'translate-x-56')}
            `}
            style={{ top: verticalPosition, zIndex:500, background: 'white' }}
            onMouseEnter={() => handleCardInteraction(index)}
            onMouseLeave={() => handleCardInteraction(null)}
            onFocus={() => handleCardInteraction(index)}
            onBlur={() => handleCardInteraction(null)}
            tabIndex={0}
          >
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p>{card.content}</p>
              <p className="mt-2 text-sm text-muted-foreground">Click for more info!</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
    <div className="relative min-h-screen overflow-hidden">
        {cards.map((card, index) => {
          const isLeft = index < 3
          const verticalPosition = `${(index % 3) * 33 + 16}%`
          
          return (
            <Card 
              key={index}
              className={`
                absolute w-64 transition-all duration-300 ease-in-out cursor-pointer
                ${isLeft ? 'left-0' : 'right-0'}
                ${hoveredCard === index ? (isLeft ? 'translate-x-0' : '-translate-x-0') : (isLeft ? '-translate-x-56' : 'translate-x-56')}
              `}
              style={{ top: verticalPosition, zIndex:500, background: 'white' }}
              onMouseEnter={() => handleCardInteraction(index)}
              onMouseLeave={() => handleCardInteraction(null)}
              onFocus={() => handleCardInteraction(index)}
              onBlur={() => handleCardInteraction(null)}
              tabIndex={0}
            >
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                <p>{card.content}</p>
                <p className="mt-2 text-sm text-muted-foreground">Click for more info!</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
        <TileLayer url={map_theme_url} attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {
          (university_mode ? uni_markers : city_markers).map((res, i) => {return marker_function(res.name, res.cords, res.wikipedia_url, university_mode ? getIcon('fc0352') : getIcon('5169e0'), i)})
        }
        {
          interesting_places.map((res, i) => {return marker_function(res.name, res.cords, res.wikipedia_url, getIcon('1f2d73'), i)})
        }
        <GeoJSON data={germanyGeoJson} style={mapStyles}></GeoJSON>
      </MapContainer>
      <footer style={{'fontSize':'3px', 'display':'flex', 'justifyContent':'right', 'height':'1vh'}}>© Ansh Mathur, Supratik, License Undecided ¯\_(ツ)_/¯ </footer>
    </div>
  );
}

export default App;
