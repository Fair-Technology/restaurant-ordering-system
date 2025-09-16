import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SuperAdmin from './SuperAdmin';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 border-b border-gray-200 mb-6 flex justify-between bg-white shadow-sm">
        <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800 font-medium">
          Customers
        </Link>
        <Link to="/restaurantOwner" className="text-blue-600 hover:text-blue-800 font-medium">
          Restaurant Owner
        </Link>
        <Link to="/superAdmin" className="text-blue-600 hover:text-blue-800 font-medium">
          Super Admin
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800">Customer View</h1>
          </div>
        } />
        <Route path="/restaurantOwner" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800">Restaurant Admin</h1>
          </div>
        } />
        <Route path="/superAdmin" element={<SuperAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
