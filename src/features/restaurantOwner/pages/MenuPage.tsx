import React from "react";
import AddItemForm from "../components/AddItemForm";
import MenuList from "../components/MenuList";
import { Item } from "../types";
import {
  useCreateItemMutation,
  useGetItemsByShopIdQuery,
} from "../../../store/api/itemApi";

const MenuPage: React.FC = () => {
  const shopId = "Shop_1";
  const [showForm, setShowForm] = React.useState(false);
  const [createItem] = useCreateItemMutation();
  const { data: items = [] } = useGetItemsByShopIdQuery(shopId);

  const handleAddItem = async (newItem: Item) => {
    console.log("New item to be added:", newItem);
    try {
      await createItem(newItem).unwrap();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add New Item
        </button>

        {showForm && (
          <AddItemForm
            onCancel={() => setShowForm(false)}
            onSubmit={handleAddItem}
          />
        )}
      </div>
      <MenuList items={items} />
    </div>
  );
};

export default MenuPage;
