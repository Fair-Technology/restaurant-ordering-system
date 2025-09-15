import React, { useState } from 'react';
import { useGetRestaurantsQuery, useCreateRestaurantMutation } from './store/api/superAdminApi';

interface MenuItem {
  name: string;
  icon: string;
}

const SuperAdmin: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Dashboard');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newRestaurant, setNewRestaurant] = useState({ name: '', address: '' });

  // RTK Query hooks
  const { data: restaurants, error, isLoading, refetch } = useGetRestaurantsQuery();
  const [createRestaurant, { isLoading: isCreating }] = useCreateRestaurantMutation();

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Restaurant list', icon: '🏪' },
    { name: 'Settings', icon: '⚙️' }
  ];

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createRestaurant(newRestaurant).unwrap();
      console.log("Response", response)
      setNewRestaurant({ name: '', address: '' });
      setShowCreateForm(false);
      // Show success message or handle success
      alert('Restaurant created successfully!');
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Failed to create restaurant. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Restaurants</h3>
                <p className="text-3xl font-bold text-blue-600">{restaurants?.length || 0}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Orders</h3>
                <p className="text-3xl font-bold text-green-600">--</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">--</p>
              </div>
            </div>
          </div>
        );

      case 'Restaurant list':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Restaurant Management</h3>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Restaurant
              </button>
            </div>

            {/* Create Restaurant Form */}
            {showCreateForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold mb-4">Create New Restaurant</h4>
                <form onSubmit={handleCreateRestaurant} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newRestaurant.address}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {isCreating ? 'Creating...' : 'Create Restaurant'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Restaurant List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Restaurants</h4>
                {isLoading ? (
                  <div className="text-center py-4">Loading restaurants...</div>
                ) : error ? (
                  <div className="text-center py-4 text-red-600">
                    Error loading restaurants.
                    <button
                      onClick={() => refetch()}
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      Retry
                    </button>
                  </div>
                ) : restaurants && restaurants.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {restaurants.map((restaurant) => (
                          <tr key={restaurant.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {restaurant.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {restaurant.address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No restaurants found. Create your first restaurant!
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Settings</h3>
            <p className="text-gray-600">Settings panel - coming soon!</p>
          </div>
        );

      default:
        return (
          <div className="bg-white p-10 rounded-lg text-center shadow-sm">
            <h3 className="text-sidebar-bg mb-2.5 text-xl font-semibold">
              Welcome to {activeMenuItem}
            </h3>
            <p className="text-gray-500">
              Main content area - ready for implementation
            </p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-sidebar-bg text-white fixed left-0 top-0 py-5 shadow-lg">
        <div className="px-5 pb-5 border-b border-sidebar-hover mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-base font-bold">
              C
            </div>
            <span className="text-lg font-bold">Celestial</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`px-5 py-3 cursor-pointer flex items-center gap-2.5 transition-colors duration-300 border-l-3 ${
                activeMenuItem === item.name
                  ? 'bg-sidebar-active border-l-blue-600'
                  : 'border-l-transparent hover:bg-sidebar-hover'
              }`}
              onClick={() => setActiveMenuItem(item.name)}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Top Bar */}
      <div className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-5  shadow-sm fixed top-0 right-0 left-64 z-10">
        <div className="flex items-center gap-5">
          <h2 className="text-sidebar-bg text-xl font-semibold">Super Admin Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
            3
          </div>
          <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
            1
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
              EM
            </div>
            <span className="text-sidebar-bg font-medium">Evan Morales</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-15 p-5 bg-gray-50 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default SuperAdmin;
