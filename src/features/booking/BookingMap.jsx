import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function BookingMap({ lat, lng, title, price }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
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
  }, [lat, lng, title, price]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}

export default BookingMap;
