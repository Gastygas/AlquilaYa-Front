"use client"
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";

const Maps = ({propertyLat,propertyLng}: {propertyLat: string,propertyLng: string}) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);


    useEffect(() => {
        const loader = new Loader({
          apiKey: `${process.env.NEXT_PUBLIC_MAPS_KEY}`,
          version: 'weekly',
          libraries: ['places'],
        });
    
        loader.load().then(() => {
          initMap();
        });
        }, []);

        const initMap = () => {
            const mapOptions = {
              center: { lat: Number(propertyLat) , lng: Number(propertyLng) },
              zoom: 15,
            };
            const mapDiv = document.getElementById('map') as HTMLElement;
            const newMap = new google.maps.Map(mapDiv, mapOptions);
            setMap(newMap);
        
            const input = document.getElementById('addressMaps') as HTMLInputElement;
            const autocomplete = new google.maps.places.Autocomplete(input, {
              fields: ['address_components', 'geometry'],
              types: ['address'],
            })
            const newMarker = new google.maps.Marker({
                position: mapOptions.center,
                map: newMap,
              });
            setMarker(newMarker)
            marker?.setPosition(mapOptions.center)
              }
    return (
        <div id="map" style={{ height: '450px', width: '450px' }}></div>
    )


}

export default Maps
