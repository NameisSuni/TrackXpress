import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';


const MapPage = ({ customers }) => {
  const [driverLocation, setdriverLocation] = useState(null);
  const [driverPath, setdriverPath] = useState([]);
  const [trackingActive, setTrackingActive] = useState(true);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize:[38, 38]
  });

  useEffect(() => {
    if (trackingActive) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setdriverLocation(location);
          setdriverPath([...driverPath, location]);
        },
        error => {
          console.log(error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [driverPath, trackingActive]);

  return (
    <div>
      <h1>Map</h1>
      <MapContainer center={[12.971599, 77.594566]} zoom={13} style={{ height: '500px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {customers.map((customer, index) => (
          <Marker
            key={index}
            position={[customer.location.latitude, customer.location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h2>{customer.name}</h2>
                <p>{customer.phoneNumber}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {driverLocation && (
          <Marker position={[driverLocation.latitude, driverLocation.longitude]} icon={customIcon}>
            <Popup>
              <div>
                <h2>driver Location</h2>
                <p>Latitude: {driverLocation.latitude}</p>
                <p>Longitude: {driverLocation.longitude}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {driverPath.length > 1 && (
          <Polyline positions={driverPath.map(location => [location.latitude, location.longitude])} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;