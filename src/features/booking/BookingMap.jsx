import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function BookingMap({ lat, lng, title, price }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return undefined;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [lat, lng],
        13
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">',
      }).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.setView([lat, lng], 13);

    if (markerRef.current) {
      markerRef.current.remove();
    }

    markerRef.current = L.marker([lat, lng])
      .addTo(mapInstanceRef.current)
      .bindPopup(`${title} $${price}`)
      .openPopup();

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, title, price]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "400px", width: "100%" }}
    ></div>
  );
}

export default BookingMap;
