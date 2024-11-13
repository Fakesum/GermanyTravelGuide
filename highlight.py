import folium
import geopandas as gpd
import json

# Load GeoJSON data for countries
world = gpd.read_file("countries.geojson")

# Create a Folium map centered around Europe
m = folium.Map(location=[51.1657, 10.4515], zoom_start=4)

# Define a function to style the countries
def style_function(feature):
    if json.loads(feature['properties']["tags"])['name'] == 'Deutschland':
        return {'fillColor': 'transparent', 'color': 'transparent'}  # Make Germany transparent
    else:
        return {'fillColor': 'black', 'color': 'transparent'}  # Color for other countries

# Add GeoJSON layer to the map
folium.GeoJson(
    world,
    style_function=style_function
).add_to(m)

m.save('highlight_not_germany.html')