import { Item } from "../../restaurantOwner/types";

interface CustomerMenuListProps {
  items: Item[];
  onAddToCart: (item: Item) => void;
}

const CustomerMenuList: React.FC<CustomerMenuListProps> = ({
  items,
  onAddToCart,
}) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 italic">No items available right now.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition"
        >
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-gray-700">{item.description}</p>
          <p className="text-gray-900 font-semibold">${item.price}</p>

          <button
            className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            onClick={() => onAddToCart(item)}
          >
            Add to Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomerMenuList;
