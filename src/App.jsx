import { Helmet } from "react-helmet"
import { Button } from "./components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/card"
import { Input } from "./components/input"
import { Plane, MapPin, Menu } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Map from './map'
import { interesting_places, uni_markers } from './map'
import Footer from './footer'

export default function DeutscheReisen() {
  const locations = [
    { city: 'Berlin', latitude: 52.52, longitude: 13.405 },
    { city: 'München', latitude: 48.1351, longitude: 11.5820 },
    { city: 'Hamburg', latitude: 53.5511, longitude: 9.9937 },
    { city: 'Köln', latitude: 50.9375, longitude: 6.9603 },
    { city: 'Frankfurt', latitude: 50.1109, longitude: 8.6821 },
    { city: 'Stuttgart', latitude: 48.7758, longitude: 9.1829 },
    { city: 'Düsseldorf', latitude: 51.2277, longitude: 6.7735 },
    { city: 'Dortmund', latitude: 51.5136, longitude: 7.4653 },
    { city: 'Essen', latitude: 51.4566, longitude: 7.0116 },
    { city: 'Leipzig', latitude: 51.3397, longitude: 12.3731 },
    { city: 'Bremen', latitude: 53.0793, longitude: 8.8017 },
    // { city: 'Dresden', latitude: 51.0509, longitude: 13.7383 },
    // { city: 'Hannover', latitude: 52.3759, longitude: 9.7320 },
    // { city: 'Nürnberg', latitude: 49.4521, longitude: 11.0767 },
    // { city: 'Mannheim', latitude: 49.4875, longitude: 8.4660 },
    // { city: 'Karlsruhe', latitude: 49.0069, longitude: 8.4037 },
    // { city: 'Freiburg', latitude: 47.9990, longitude: 7.8421 },
    // { city: 'Augsburg', latitude: 48.4011, longitude: 10.8984 },
    // { city: 'Wiesbaden', latitude: 50.0822, longitude: 8.2493 },
    // { city: 'Gelsenkirchen', latitude: 51.5177, longitude: 7.0812 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Footer/>


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
            <h2 className="text-3xl font-bold mb-8 text-center m-7">Städte</h2>
            <p className="text-2l mb-8 text-center mt-28 mb-28">Traveling to cities in Germany offers a rich tapestry of benefits, including an immersive cultural experience marked by world-class museums, theaters, and historical landmarks that reflect the country’s profound heritage. Visitors can indulge in diverse culinary delights, from traditional sausages to regional beers, while participating in vibrant festivals like Oktoberfest that celebrate local traditions. The efficient public transportation system makes it easy to navigate between cities and explore the stunning landscapes that surround urban areas. Additionally, Germany's central location in Europe provides an excellent base for further travel, allowing tourists to easily venture into neighboring countries. With friendly locals and a blend of modernity and history, a trip to Germany’s cities promises unforgettable experiences and lasting memories.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => (
                <Card key={location.city}>
                  <CardHeader>
                    <CardTitle>{`cities-${location.city}`}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.latitude, location.longitude+0.09]}
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
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Deutschland</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center m-7">Interessante Orte zu besuchen.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interesting_places.map((location) => (
                <Card key={`interesting-${location.name}`}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.cords[0], location.cords[1]+0.09]}
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
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">Deutschland</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <h2 className="text-3xl font-bold mb-8 text-center m-7">Universität.</h2>
            <p className="text-2l mb-8 text-center mt-28 mb-28">Germany is home to a diverse array of universities renowned for their academic excellence, research opportunities, and innovative programs. With a strong emphasis on engineering, technology, and the sciences, institutions such as the Technical University of Munich, RWTH Aachen University, and the University of Heidelberg consistently rank among the top in global university rankings. Many universities offer programs in English, attracting international students and fostering a multicultural environment. Additionally, Germany’s commitment to providing tuition-free or low-cost education for both domestic and international students makes it an attractive destination for higher learning. Beyond academics, German universities often emphasize practical experience through internships and collaborations with industries, equipping students with the skills needed for successful careers in a global job market. The vibrant student life, combined with Germany's rich cultural heritage and strong economy, further enhances the appeal of studying in this dynamic country.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uni_markers.map((location) => (
                <Card key={`universities-${location.name}`}>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={[location.cords[0], location.cords[1]+0.09]}
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
                  <CardFooter className="flex justify-between">
                  </CardFooter>
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