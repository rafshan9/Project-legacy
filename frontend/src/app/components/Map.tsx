'use client';

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapProps {
    center?: number[]
}

const Map = ({ center }: MapProps) => {
    return (
        <MapContainer 
            center={(center as L.LatLngExpression) || [51.505, -0.09]} 
            zoom={4} 
            scrollWheelZoom={false} 
            className="h-full w-full rounded-lg" // 1. Use Tailwind to fill parent
            style={{ height: "100%", width: "100%" }} // 2. FORCE height with inline style (The Fix)
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker 
                    position={center as L.LatLngExpression} 
                    icon={markerIcon}
                />
            )}
        </MapContainer>
    );
}

export default Map;