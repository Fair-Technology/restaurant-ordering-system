import { useGetAvailableItemsByShopQuery } from "../../../store/api/itemApi";
import CustomerMenuList from "../components/CustomerMenuList";

const CustomerDashboard: React.FC = () => {
  const {
    data: items = [],
    isLoading,
    isError,
  } = useGetAvailableItemsByShopQuery("Shop_1"); // Shop ID should b passed dynamically later

  const handleAddToCart = (item: any) => {
    console.log("Adding to cart:", item);
    // Later: dispatch to Redux cart slice
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to Load Menu.</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      <CustomerMenuList items={items} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default CustomerDashboard;
