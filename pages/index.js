import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomePage from "../src/components/HomePage";
import Explorecity from "../components/ExploreCity";
import { useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
const placesLibrary = ['places'];
import ExploreProperties from "../components/ExploreProperties";
import Propertytype from "../components/Propertytype";
import OurService from "../components/OurService";
const Counter = dynamic(() => import("../src/components/Counter"), {
  ssr: false,
});


const Index = () => {
  
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // Fetch location name using reverse geocoding
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ`)
            .then(response => response.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                // Extracting more specific address components
                const addressComponents = data.results[0].address_components;
                const cityName = addressComponents.find(component => component.types.includes('locality'));
                const stateName = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
                const countryName = addressComponents.find(component => component.types.includes('country'));

                // Constructing a more detailed location name
                const detailedLocation = [cityName, stateName, countryName]
                  .filter(component => component !== undefined)
                  .map(component => component.long_name)
                  .join(', ');

                setLocations(detailedLocation);
              } else {
                setLocations("Location not found");
              }
            })
            .catch(error => {
              console.error('Error fetching location:', error);
              setLocations("Error fetching location");
            });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
   
      {/* <!--====== Start Hero Section ======--> */}
    <HomePage/>
    <Explorecity/>
    <ExploreProperties locations={locations} />
    {/* <Propertytype/> */}
    <div class="bg-white p-4 min-h-[150px] flex items-center justify-center font-[sans-serif] text-[#333]">
      <div class="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-24 gap-12 rounded-3xl px-20 py-10">
        <div class="text-center">
          <h3 class="text-4xl font-extrabold">5.4<span class="text-blue-600">M+</span></h3>
          <p class="text-gray-500 font-semibold mt-3">Total Users</p>
        </div>
        <div class="text-center">
          <h3 class="text-4xl font-extrabold">$80<span class="text-blue-600">K</span></h3>
          <p class="text-gray-500 font-semibold mt-3">Revenue</p>
        </div>
        <div class="text-center">
          <h3 class="text-4xl font-extrabold">100<span class="text-blue-600">K</span></h3>
          <p class="text-gray-500 font-semibold mt-3">Engagement</p>
        </div>
        <div class="text-center">
          <h3 class="text-4xl font-extrabold">99.9<span class="text-blue-600">%</span></h3>
          <p class="text-gray-500 font-semibold mt-3">Server Uptime</p>
        </div>
      </div>
    </div>
    <OurService/>
    </div>
  );
};
export default Index;
