import React from 'react'
import Loading from 'react-loading'
import { Card, CardContent } from "./components/card"
import Progress from './components/progress'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function LocationRatingsComponent({ data }) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">{data.name}</h1>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Overall Score</h2>
          <div className="flex items-center gap-4">
            <Progress value={data.overallScore} className="w-full" />
            <span className="text-2xl font-bold">{data.overallScore}/100</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Area Ratings</h2>
          <div className="space-y-4">
            {data.ratings.map((rating, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{rating.category}</span>
                  <span>{rating.score}/100</span>
                </div>
                <Progress value={rating.score} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Events</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.currentEvents.map((event, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LocationRatings() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [locationData, setLocationData] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:3030/location/${searchParams.get('location')}`, {mode:"no-cors"})
      .then(res => {
          return res.json()
        })
      .then(res => {
        setLocationData(res);
        setIsLoading(false);
      });
    return ()=>{};
  });
  
  return isLoading ? <Loading></Loading> : <LocationRatingsComponent data={locationData} />
}