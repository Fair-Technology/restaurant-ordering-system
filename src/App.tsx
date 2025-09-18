import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SuperAdmin from './pages/superAdmin/login';
import ShopOwner from './pages/shopOwner/shopOwner';
import SuperAdminDashboard from './pages/superAdmin/dashboard';

const App: React.FC = () => {
  return (
     <Router>
      <nav style={{ padding: 16, borderBottom: '1px solid #eee', marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 16 }}>Customer</Link>
        {/* Removed links for Restaurant Owner and Super Admin */}
      </nav>
      <Routes>
        <Route path="/" element={<div><h1>Customer View</h1></div>} />
        <Route path="/shop-owner" element={<ShopOwner />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
         <Route path="/superAdminDashboard" element={<SuperAdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
