import React, { useState } from 'react';
import './App.css';
import LoginPage from './Components/LoginPage';
import CustomerPage from './Components/CustomerPage';
import MapPage from './Components/MapPage';


function App() {
  const [customers, setCustomers] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const handleAddCustomer = (customer) => {
    setCustomers([...customers, customer]);
  }

  const handleLogin = () => {
    setIsLogin(true);
  }

  const handleLogout = () => {
    setIsLogin(false);
  }

  return (
    <div className="App">
      {!isLogin && <LoginPage onLogin={handleLogin} />}
      {isLogin && (
        <div>
          <CustomerPage onAddCustomer={handleAddCustomer} />
          <MapPage customers={customers} />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
