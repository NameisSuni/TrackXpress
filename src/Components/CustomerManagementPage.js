import React, { useState } from 'react';

const CustomerManagementPage = ({ onAddCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddCustomer = () => {
    if (name && phoneNumber && latitude && longitude) {
      const newCustomer = {
        name,
        phoneNumber,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      };

      setCustomers([...customers, newCustomer]);
      onAddCustomer(newCustomer); // Pass the new customer data to the parent component
      setName('');
      setPhoneNumber('');
      setLatitude('');
      setLongitude('');
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={handleAddCustomer}>Add Customer</button>

      {customers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.location.latitude}</td>
                <td>{customer.location.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerManagementPage;