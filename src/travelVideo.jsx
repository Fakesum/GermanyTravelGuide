import { Helmet } from "react-helmet"
import { Plane } from "lucide-react"
import Footer from './footer'
export default function () {
    return (
      <>
        <Footer/>
        <main className="flex-grow">
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Deutsches Reisevideo</h1>
            <div style={{justifyContent:"center", width:"100%", height:"100%", display:'flex'}}>
                <iframe width="513" height="315" allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen" src="https://youtube.com/embed/6sx0kIIWvwo"></iframe>
            </div>
          </div>
        </section>
        </main>
        <footer style={{'fontSize':'3px', 'display':'flex', 'justifyContent':'center', 'height':'1vh'}}>© Ansh Mathur, Supratik, License Undecided ¯\_(ツ)_/¯ </footer>
      </>
    )
}