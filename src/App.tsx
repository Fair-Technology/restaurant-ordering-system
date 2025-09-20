import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RestaurantOwnerDashboardPage from "./features/restaurantOwner/pages/RestaurantOwnerDashboard";
import CustomerDashboard from "./features/customer/pages/CustomerDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-2 border-b border-gray-200 mb-6 flex gap-4 bg-white shadow-sm">
        <Link
          to="/"
          className=" text-blue-600 hover:text-blue-800 font-medium"
        >
          Customer
        </Link>
        <Link
          to="/restaurantOwner"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Restaurant Owner
        </Link>

      </nav>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route
          path="/restaurantOwner/*"
          element={<RestaurantOwnerDashboardPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
