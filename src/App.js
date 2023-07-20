import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import CustomerManagementPage from './Components/CustomerManagementPage';
import MapPage from './Components/MapPage';
import RealTimeLocationTracking from './Components/RealTimeLocationTracking';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [driverLocation, setDriverLocation] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  const handleUpdateDriverLocation = (location) => {
    setDriverLocation(location);
  };

  return (
    <div>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {isLoggedIn && (
        <div>
          <CustomerManagementPage onAddCustomer={handleAddCustomer} />
          <MapPage customers={customers} />
          <RealTimeLocationTracking onUpdateLocation={handleUpdateDriverLocation} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );

};

export default App;