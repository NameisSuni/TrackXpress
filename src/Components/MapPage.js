import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMap from './RoutingMap';
import RealtimeLocation from './RealtimeLocation';

function MapPage({ customers }) {
  const [driverLocation, setDriverLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const trackingActive = true;

  const handlePath = (path) => {
    setRoute(path);
  }

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38]
  });
  L.Marker.prototype.options.icon = customIcon;

  useEffect(() => {
    if (trackingActive) {
      const watchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setDriverLocation(location);
        },
        error => {
          console.log(error);
        }
      );
      return () => {
        navigator.geolocation.clearWatch(watchId);
      }
    }
  }, [trackingActive]);

  return (
    <div>
      <h3>MapPage</h3>
      <MapContainer center={[12.971599, 77.594566]} zoom={13} style={{ height: "500px" }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {driverLocation && (
          <Marker position={[driverLocation.latitude, driverLocation.longitude]}>
            <Popup>
              <h2>Driver Location</h2>
              <p>{driverLocation.latitude}</p>
              <p>{driverLocation.longitude}</p>
            </Popup>
          </Marker>
        )}

        {customers.map((customer, index) => (
          <Marker key={index} position={[customer.location.latitude, customer.location.longitude]}>
            <Popup>
              <h2>Customer Location</h2>
              <p>{customer.name}</p>
              <p>{customer.phonenumber}</p>
            </Popup>
          </Marker>
        ))}

        <RoutingMap driverLocation={driverLocation} customers={customers} onPath={handlePath} />
      </MapContainer>
      <RealtimeLocation route={route} />
    </div>
  )
}

export default MapPage;
