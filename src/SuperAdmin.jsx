import React, { useState } from 'react';
import axios from 'axios';

const SuperAdmin = () => {
  const [restaurant, setRestaurant] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://restaurant-ordering-system.azurewebsites.net/api/superadmin/shops', restaurant);
      alert('Restaurant Created Successfully!');
      setRestaurant({ name: '', address: '' });
    } catch (error) {
      alert('Failed to create restaurant.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Create Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={restaurant.address}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Create</button>
      </form>
    </div>
  );
};

export default SuperAdmin;
