import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SuperAdmin from "./SuperAdmin";
import RestaurantOwnerDashboardPage from "./features/restaurantOwner/pages/RestaurantOwnerDashboard";
import CustomerDashboard from "./features/customer/pages/CustomerDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 border-b border-gray-200 mb-6 flex justify-between bg-white shadow-sm">
        <Link
          to="/customer"
          className="mr-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Customer
        </Link>
        <Link
          to="/restaurantOwner"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Restaurant Owner
        </Link>
        <Link
          to="/superAdmin"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Super Admin
        </Link>
      </nav>
      <Routes>
        <Route path="/customer/*" element={<CustomerDashboard />} />

        <Route
          path="/restaurantOwner/*"
          element={<RestaurantOwnerDashboardPage />}
        />
        <Route path="/superAdmin" element={<SuperAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
