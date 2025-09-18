import { useMsal } from "@azure/msal-react";

const ShopOwner = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect();
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Shop Owner</h2>
      <button onClick={handleLogin} style={{ padding: '8px 16px' }}>
        Login
      </button>
    </div>
  );
};

export default ShopOwner;