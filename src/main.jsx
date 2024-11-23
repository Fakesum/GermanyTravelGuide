import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LocationRatings from './locationDisplay'
import TravelVideo from './travelVideo'
import './index.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            {/* <Route path="/video" element={<TravelVideo />}/> */}
        </Routes>
    </BrowserRouter>
)
