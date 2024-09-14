import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function BookingMap({ lat, lng, title, price }) {
  const mapRef = useRef(null); // Create a ref to store the map instance

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it hasn't been initialized yet
      mapRef.current = L.map("map").setView([lat, lng], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">',
      }).addTo(mapRef.current);

      L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(`${title} $${price}`)
        .openPopup();
    } else {
      // If the map is already initialized, just set the view to the new lat/lng
      mapRef.current.setView([lat, lng]);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">',
      }).addTo(mapRef.current);

      L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(`${title} $${price}`)
        .openPopup();
    }
  }, [lat, lng, title, price]); // The effect re-runs when lat, lng, title, or price change

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}

export default BookingMap;
