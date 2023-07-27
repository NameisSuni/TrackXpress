import React, { useEffect, useState } from 'react';

function RealtimeLocation({ route }) {
  const [isTracking, setIsTracking] = useState(false);
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    let intervelId;
    if (isTracking) {
      intervelId = setInterval(() => {
        const currentRoute = route;
        setRoutes((prevPath) => [...prevPath, currentRoute])
        // console.log(routes);
      }, 10000)
    }
    else {
      clearInterval(intervelId);
    }

    return () => {
      clearInterval(intervelId);
    }
  }, [isTracking, route])

  const handleStartTracking = () => {
    setIsTracking(true);
  }

  const handleStopTracking = () => {
    setIsTracking(false);
  }

  return (
    <div>
      <h3>RealtimeLocation</h3>
      <button onClick={handleStartTracking}>Start Tracking</button>
      <button onClick={handleStopTracking}>Stop Tracking</button>
      <div>
        <h3>Path: </h3>
        <ul>
          {routes.map((LatLng, index) => (
            <li key={index}>{`Latitude: ${LatLng[index].lat}, Longitude: ${LatLng[index].lng}`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RealtimeLocation;
