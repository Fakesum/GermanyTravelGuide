import { Helmet } from "react-helmet"
import { Plane } from "lucide-react"
export default ()=>{
    return (
        <header className="bg-primary text-primary-foreground">
            <Helmet>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="icon" type="image/png" href="/favicon.ico"/>
            </Helmet>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Deutsche Reisen</span>
        </a>
        <nav className="hidden md:flex space-x-4">
            <a href="/" className="hover:underline">Startseite</a>
        </nav>
        </div>
        </header>
    )
}