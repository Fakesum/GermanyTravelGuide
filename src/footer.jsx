import { Helmet } from "react-helmet"
import { Plane } from "lucide-react"
export default ()=>{
    return (
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
            {/* <a href="/video" className="hover:underline">Deutsches Reisevideo</a> */}
        </nav>
        </div>
        </header>
    )
}