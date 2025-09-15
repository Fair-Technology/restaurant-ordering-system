import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SuperAdmin from './SuperAdmin';

function App() {
  return (
    <Router>
      <nav style={{ padding: 16, borderBottom: '1px solid #eee', marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ marginRight: 16 }}>Customer</Link>
        <Link to="restaurantOwner">Restaurant Owner</Link>
        <Link to="/superAdmin">Super Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div><h1>Customer View</h1></div>} />
        <Route path="/restaurantOwner" element={<div><h1>Restaurant Admin</h1></div>} />
        <Route path="/superAdmin" element={<SuperAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
