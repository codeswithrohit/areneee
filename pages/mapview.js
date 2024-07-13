import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { firebase } from '../Firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Test = () => {
    const [bookingData, setBookingData] = useState(null);
    const [VendorLocation, setVendorLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [deliverylocation, setDeliveryLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const router = useRouter();
    const { orderId } = router.query;
    const mapRef = useRef(null);
    const deliveryMarkerRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const db = firebase.firestore();
                const bookingRef = db.collection('kitchenorder').where('orderId', '==', orderId);
                const snapshot = await bookingRef.get();

                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    setBookingData(data);
                    setVendorLocation(data.VendorLocation);
                    setAddress(data.address);
                    setDeliveryLocation(data.deliveryboylocation);
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking details:', error);
                setLoading(false);
            }
        };

        if (orderId) {
            fetchBookingDetails();
        }
    }, [orderId]);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (deliverylocation) {
                const { lat, lng } = deliverylocation;

                // Initialize Google Map
                const mapInstance = new window.google.maps.Map(mapRef.current, {
                    center: { lat, lng },
                    zoom: 12,
                });
                mapInstanceRef.current = mapInstance;

                // Add delivery location marker
                addMarker(mapInstance, deliverylocation, "/path_to_your_deliveryboy.png");

                // Fetch and add the address location marker and show route
                fetchLocationAndAddMarker(mapInstance, address, "/path_to_your_user_icon.avif");
            } else {
                console.error('Delivery location is not available.');
            }
        };

        loadGoogleMapsScript();
    }, [address, deliverylocation]);

    useEffect(() => {
        let intervalId;

        if (orderId) {
            intervalId = setInterval(async () => {
                const db = firebase.firestore();
                const bookingRef = db.collection('kitchenorder').where('orderId', '==', orderId);
                const snapshot = await bookingRef.get();

                if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        setDeliveryLocation(data.deliveryboylocation);

                        if (mapInstanceRef.current && deliveryMarkerRef.current) {
                            const { lat, lng } = data.deliveryboylocation;
                            const position = new window.google.maps.LatLng(lat, lng);
                            deliveryMarkerRef.current.setPosition(position);
                            mapInstanceRef.current.panTo(position);

                            // Update distance and duration
                            calculateDistanceAndDuration(address, { lat, lng });
                        }
                    });
                }
            }, 1000); // Fetch new data every second
        }

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [orderId, address]);

    const fetchLocationAndAddMarker = (map, address, iconUrl) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB6gEq59Ly20DUl7dEhHW9KgnaZy4HrkqQ`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    addMarker(map, location, iconUrl);
                    showRoute(map, location, deliverylocation);
                    calculateDistanceAndDuration(location, deliverylocation);
                } else {
                    console.error(`Geocode was not successful for the following reason: ${data.status}`);
                }
            })
            .catch(error => console.error('Error fetching geocode:', error));
    };

    const addMarker = (map, location, iconUrl) => {
        const marker = new window.google.maps.Marker({
            position: location,
            map,
            icon: {
                url: iconUrl,
                scaledSize: new window.google.maps.Size(50, 50),
            },
        });
        if (iconUrl === "/path_to_your_deliveryboy.png") {
            deliveryMarkerRef.current = marker;
        }
    };

    const showRoute = (map, origin, destination) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRendererRef.current = directionsRenderer;

        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error(`Directions request failed due to ${status}`);
                }
            }
        );
    };

    const calculateDistanceAndDuration = (origin, destination) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                    setDistance(response.rows[0].elements[0].distance.text);
                    setDuration(response.rows[0].elements[0].duration.text);
                } else {
                    console.error(`DistanceMatrix request failed due to ${status}`);
                }
            }
        );
    };

    return (
        <div className='min-h-screen bg-white mt-16'>
            <div>
                {loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center mt-4">
                            Loading...
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex  justify-start ">
                        {distance && duration && (
                            <div className="font-bold px-16 ">
                                  <p>  Delivery boy: {deliverylocation}</p>
                                <p>Distance: {distance}</p>
                                <p>Estimated Delivery Time: {duration}</p>
                            </div>
                        )}
                           
                        </div>
                        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
                        
                    </>
                )}
                    </div>
            <ToastContainer />
        </div>
    );
};

export default Test;
