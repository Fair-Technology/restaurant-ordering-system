import { useMsal } from "@azure/msal-react";
//import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const { instance, accounts } = useMsal();
  //const navigate = useNavigate();

  const handleLogin = () => {
    instance.loginRedirect();
    //navigate("/superAdminDashboard"); 
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Admin</h2>
      {!accounts.length ? (
        <button onClick={handleLogin} className="bg-red-300 text-green-500">
          Login
        </button>
      ) : (
        <button onClick={handleLogout} className="bg-blue-300 text-red-500">
          Logout
        </button>
      )}
    </div>
  );
};

export default SuperAdmin;