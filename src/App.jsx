import { Helmet } from "react-helmet"
import { Button } from "./components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card"
import { Input } from "./components/input"
import { Plane, MapPin, Menu } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Map from './map'
import { interesting_places, uni_markers } from './map'
import Footer from './footer'
import SafetyMetricsDisplay from './SafetyMetricsDisplay';

export default function DeutscheReisen() {
  const locations = [
    {
      city: 'Berlin',
      latitude: 52.52,
      longitude: 13.405,
      safetyScore: 7.5, // out of 10
      populationDensity: 4045, // people per square kilometer
      perCapitaIncome: 40000 // in USD
    },
    {
      city: 'München',
      latitude: 48.1351,
      longitude: 11.5820,
      safetyScore: 8.0,
      populationDensity: 4800,
      perCapitaIncome: 45000
    },
    {
      city: 'Hamburg',
      latitude: 53.5511,
      longitude: 9.9937,
      safetyScore: 7.0,
      populationDensity: 2400,
      perCapitaIncome: 42000
    },
    {
      city: 'Köln',
      latitude: 50.9375,
      longitude: 6.9603,
      safetyScore: 7.2,
      populationDensity: 4000,
      perCapitaIncome: 41000
    },
    {
      city: 'Frankfurt',
      latitude: 50.1109,
      longitude: 8.6821,
      safetyScore: 7.8,
      populationDensity: 3000,
      perCapitaIncome: 48000
    },
    {
      city: 'Stuttgart',
      latitude: 48.7758,
      longitude: 9.1829,
      safetyScore: 7.6,
      populationDensity: 2900,
      perCapitaIncome: 47000
    },
    {
      city: 'Düsseldorf',
      latitude: 51.2277,
      longitude: 6.7735,
      safetyScore: 7.4,
      populationDensity: 3200,
      perCapitaIncome: 44000
    },
    {
      city: 'Dortmund',
      latitude: 51.5136,
      longitude: 7.4653,
      safetyScore: 6.5,
      populationDensity: 2800,
      perCapitaIncome: 39000
    },
    {
      city: 'Essen',
      latitude: 51.4566,
      longitude: 7.0116,
      safetyScore: 6.8,
      populationDensity: 2200,
      perCapitaIncome: 37000
    },
    {
      city: 'Leipzig',
      latitude: 51.3397,
      longitude: 12.3731,
      safetyScore: 7.1,
      populationDensity: 3000,
      perCapitaIncome: 38000
    },
    {
      city: 'Bremen',
      latitude: 53.0793,
      longitude: 8.8017,
      safetyScore: 7.3,
      populationDensity: 1800,
      perCapitaIncome: 36000
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-primary-foreground">
            <Helmet>
                <script src="https://cdn.tailwindcss.com"></script>
            </Helmet>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Deutsche Reisen</span>
        </a>
        <nav className="hidden md:flex space-x-4">
            <a href="/" className="hover:underline">Startseite</a>
            <a href="#university" className="hover:underline" onClick={()=>{document.getElementById("universities").scrollIntoView({behavior: 'smooth'})
}}>Universität</a>
            <a href="#cities" className="hover:underline" onClick={()=>{document.getElementById("cities").scrollIntoView({behavior: 'smooth'});
}}>Städte</a>
            <a href="#locations" className="hover:underline" onClick={()=>{document.getElementById("locations").scrollIntoView({behavior: 'smooth'})
}}>Standorte</a>
            <a href="/video" className="hover:underline">Deutsches Reisevideo</a>
        </nav>
        </div>
        </header>


      <main className="flex-grow">
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Entdecken Sie Deutschland</h1>
            <p className="text-xl mb-8">Von malerischen Dörfern bis zu pulsierenden Städten</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center m-7">Beliebte Reiseziele</h2>
            <Map/>
            <h2 className="text-3xl font-bold mb-8 text-center m-7" id="cities">Städte</h2>
            <p className="text-2l mb-8 text-center mt-28 mb-28">Traveling to cities in Germany offers a rich tapestry of benefits, including an immersive cultural experience marked by world-class museums, theaters, and historical landmarks that reflect the country’s profound heritage. Visitors can indulge in diverse culinary delights, from traditional sausages to regional beers, while participating in vibrant festivals like Oktoberfest that celebrate local traditions. The efficient public transportation system makes it easy to navigate between cities and explore the stunning landscapes that surround urban areas. Additionally, Germany's central location in Europe provides an excellent base for further travel, allowing tourists to easily venture into neighboring countries. With friendly locals and a blend of modernity and history, a trip to Germany’s cities promises unforgettable experiences and lasting memories.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => (
                <Card key={location.city}>
                  <CardHeader>
                    <CardTitle>{`cities-${location.city}`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.latitude, location.longitude+0.065]}
                      zoom={13}
                      style={{ height: '200px', borderRadius: '0.5rem' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[location.latitude, location.longitude]}>
                        <Popup>{location.city}</Popup>
                      </Marker>
                    </MapContainer>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                  <div className="flex items-center justify-center bg-gray-100 p-2">
                    <SafetyMetricsDisplay
                      safetyScore={location.safetyScore*10}
                      populationDensity={location.populationDensity}
                      perCapitaIncome={location.perCapitaIncome}
                    />
                  </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center m-7" id="locations">Interessante Orte zu besuchen.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
              {interesting_places.map((location) => (
                <Card key={`interesting-${location.name}`}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.cords[0], location.cords[1]+0.065]}
                      zoom={13}
                      style={{ height: '200px', borderRadius: '0.5rem' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={location.cords}>
                        <Popup>{location.name}</Popup>
                      </Marker>
                    </MapContainer>
                  </CardContent>
                </Card>
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center m-7" id="universities">Universität.</h2>
            <p className="text-2l mb-8 text-center mt-28 mb-28">Germany is home to a diverse array of universities renowned for their academic excellence, research opportunities, and innovative programs. With a strong emphasis on engineering, technology, and the sciences, institutions such as the Technical University of Munich, RWTH Aachen University, and the University of Heidelberg consistently rank among the top in global university rankings. Many universities offer programs in English, attracting international students and fostering a multicultural environment. Additionally, Germany’s commitment to providing tuition-free or low-cost education for both domestic and international students makes it an attractive destination for higher learning. Beyond academics, German universities often emphasize practical experience through internships and collaborations with industries, equipping students with the skills needed for successful careers in a global job market. The vibrant student life, combined with Germany's rich cultural heritage and strong economy, further enhances the appeal of studying in this dynamic country.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uni_markers.map((location) => (
                <Card key={`universities-${location.name}`}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.cords[0], location.cords[1]+0.065]}
                      zoom={13}
                      style={{ height: '200px', borderRadius: '0.5rem' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={location.cords}>
                        <Popup>{location.name}</Popup>
                      </Marker>
                    </MapContainer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Über uns</h3>
              <p className="text-sm">Deutsche Reisen ist Ihr zuverlässiger Partner für unvergessliche Reisen durch Deutschland.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <p className="text-sm">Email: info@deutschereisen.de</p>
              <p className="text-sm">Telefon: +49 123 456789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Folgen Sie uns</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-primary hover:text-primary/80">Facebook</a>
                <a href="#" className="text-primary hover:text-primary/80">Instagram</a>
                <a href="#" className="text-primary hover:text-primary/80">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <footer style={{'fontSize':'3px', 'display':'flex', 'justifyContent':'center', 'height':'1vh'}}>© Ansh Mathur, Supratik, License Undecided ¯\_(ツ)_/¯ </footer>
    </div>
  )
}