import React, { useState } from 'react';

function CustomerPage({ onAddCustomer }) {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleAddCustomer = () => {
        if (name && phonenumber && latitude && longitude) {
            const newCustomer = {
                name,
                phonenumber,
                location: {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                }
            }
            setCustomers([...customers, newCustomer]);
            onAddCustomer(newCustomer);
            setName('');
            setPhonenumber('');
            setLatitude('');
            setLongitude('');
        } else {
            alert("Please fill all the fields.");
        }
    }

    return (
        <div>
            <h3>CustomerPage</h3>
            <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='PhoneNumber' value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
            <input placeholder='Latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            <input placeholder='Longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            <button onClick={handleAddCustomer}>Add Customer</button>

            {customers.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>PhoneNumber</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.phonenumber}</td>
                                <td>{customer.location.latitude}</td>
                                <td>{customer.location.longitude}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CustomerPage;
