import React, { useEffect, useState } from 'react';

function RealTimeLocationTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [path, setPath] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isTracking) {
      intervalId = setInterval(() => {
        const currentLocation = { latitude: 12.971599, longitude: 77.594566 };  // Bangalore
        // Update the path with the new location
        setPath((prevPath) => [...prevPath, currentLocation]);
      }, 10000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTracking]);

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  return (
    <div>
      <h2>Real-time Location Tracking</h2>
      <button onClick={handleStartTracking}>Start Tracking</button>
      <button onClick={handleStopTracking}>Stop Tracking</button>
      <div>
        <h3>Path:</h3>
        <ul>
          {path.map((location, index) => (
            <li key={index}>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RealTimeLocationTracking;
