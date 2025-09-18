
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const { instance } = useMsal();
   const navigate = useNavigate();

  const handleLogin = () => {
    instance.loginRedirect();
     //navigate("/superAdminDashboard"); 
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Admin</h2>
      <button onClick={handleLogin} className="bg-red-300 text-green-500">
        Login
      </button>
    </div>
  );
};

export default SuperAdmin;