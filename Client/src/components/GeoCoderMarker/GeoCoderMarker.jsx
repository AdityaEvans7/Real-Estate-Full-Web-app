import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// Create the custom default icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Point of the icon acrdng to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const GeoCoderMarker = ({ residency }) => {
  const map = useMap();

  // Setting default location New Delhi, India
  const [position, setPosition] = useState([28.6139, 77.2090]); // Default position: New Delhi
  const [popupContent, setPopupContent] = useState("Default Location: New Delhi, India");

  useEffect(() => {
    if (!residency || !residency.address || !residency.city || !residency.country) {
      setPopupContent("Address information is incomplete.");
      return;
    }

    const formattedAddress = `${residency.address}, ${residency.city}, ${residency.country}`;

    // Geocoding the address
    ELG.geocode()
      .text(formattedAddress)
      .run((err, results) => {
        if (err) {
          console.error("Geocoding Error:", err);
          setPopupContent("Error locating address.");
          return;
        }

        if (results?.results?.length > 0) {
          const { latlng } = results.results[0];
          setPosition([latlng.lat, latlng.lng]);
          setPopupContent(formattedAddress);
          map.flyTo([latlng.lat, latlng.lng], 13); // Fly to the location
        } else {
          setPopupContent(`No results found for: ${formattedAddress}`);
        }
      });
  }, [residency, map]); // Correct dependency array

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{popupContent}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
