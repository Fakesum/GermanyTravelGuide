import React from 'react';
import { GeoJSON, Polygon } from 'react-leaflet';

function check_position(lat1, long1, lat2, long2){
    return ((long2 - long1) * (lat1 - lat2) > 0) ? 0 : 1
}

function findCenter(coords) {
    if (coords.length === 0) return null; // Return null if the array is empty

    let totalLat = 0;
    let totalLon = 0;

    // Iterate through the array to sum latitudes and longitudes
    for (let i = 0; i < coords.length; i++) {
        totalLat += coords[i][0]; // Add latitude
        totalLon += coords[i][1]; // Add longitude
    }

    // Calculate the average latitude and longitude
    const centerLat = totalLat / coords.length;
    const centerLon = totalLon / coords.length;

    return [centerLat, centerLon]; // Return the center coordinate
}

export default ({ polygon }) => {
    // Get the polygon coordinates and note GeoJSON uses [lng, lat] while Leaflet uses [lat, lng]
    const coordinates = polygon.features[0].geometry.coordinates[0][0];
    var left = [];
    var right = [];
    var center = findCenter(coordinates);
    coordinates.map(res => {
        if (check_position(res[0], res[1], center[0], center[1]) == 0){
            left.push(res);
        } else {
            right.push(res)
        }
    });

    // Create two polygons for the darkened areas with correct [lat, lng] order
    const darkenedAreas = [
      // Left side: from -180 to westernmost points
      [
        [-90, -180],  // bottom left world corner
        [-90, center[1]],
        ...left,  // westernmost vertex
        [90, center[1]],
        [90, -180],   // top left world corner
      ],
      // Right side: from easternmost points to 180
      [
        [-90, 180],   // bottom right world corner
        ...right,  // easternmost vertex
        [90, 180],    // top right world corner
      ]
    ];
    console.log(darkenedAreas);
  
    // Style for the darkened areas
    const darkenedStyle = {
      fillColor: '#000',
      fillOpacity: 0.5,
      stroke: false,
    };
  
    // Style for the highlighted polygon
    const polygonStyle = {
      fillColor: 'transparent',
      color: '#3388ff',
      weight: 2,
    };
  
    return (
      <>
        {/* Darkened polygons */}
        {darkenedAreas.map((positions, index) => (
          <Polygon 
            key={index}
            positions={positions}
            pathOptions={darkenedStyle}
          />
        ))}
  
        {/* The main polygon */}
        <GeoJSON 
          data={polygon}
          style={polygonStyle}
        />
    </>
    );
  };