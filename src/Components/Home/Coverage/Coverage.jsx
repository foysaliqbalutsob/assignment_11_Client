import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [mapCenter, setMapCenter] = useState([23.8103, 90.4125]);
  const [zoomLevel, setZoomLevel] = useState(8);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();  
    console.log("Searching:", location);

    const district = serviceCenters.find(
      (l) =>
        l.district.toLowerCase().includes(location) ||
        l.city.toLowerCase().includes(location)
    );

    if (district) {
      const coOrd = [district.latitude, district.longitude];
      console.log("FOUND:", coOrd);

      setMapCenter(coOrd);   // <-- Map center change
      setZoomLevel(12);      // <-- Zoom into location
    } else {
      alert("No matching location found!");
    }
  };

  return (
    <div>
      <h1>Our coverage</h1>

      {/* Search Box */}
      <form onSubmit={handleSearch}>
        <label className="input flex gap-2 items-center border p-2 rounded-md">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="location"
            className="grow"
            placeholder="Search district/city"
          />
        </label>
      </form>

      <div className="h-[800px] w-full border mt-4">
        <MapContainer
          className="h-[800px]"
          center={mapCenter}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          key={mapCenter.toString()}     // <== re-render trick
        >
          <TileLayer
            attribution='© OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <h1 className="font-bold">{center.district}</h1>
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
