import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import Header from '../Components/Header';
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

export default function ViewItemPage() {
  const [items, setItems] = useState([]), [loading, setLoading] = useState(true);
  const navigate = useNavigate(), api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${api}/item/getItems`);
        setItems(res.data.items || res.data || []);
      } catch (err) {
        toast.error(err?.response?.data?.msg || "Failed to fetch items", {
          position: "top-right", autoClose: 5000, theme: "light", transition: Bounce
        });
      } finally { setLoading(false); }
    })();
  }, []);

  const handleClick = id => navigate(`/item/${id}`);

  const ItemCard = ({ item }) => (
    <div onClick={() => handleClick(item._id || item.id)} className="bg-white dark:bg-gray-400 rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
      <div className="aspect-w-16 aspect-h-12 bg-gray-100 dark:bg-gray-300">
        <img src={`${api}/uploads/${item.coverImage}`} alt={item.itemName} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate">{item.itemName}</h3>
        <p className="text-sm text-blue-600 dark:text-blue-300 font-medium mb-2">{item.itemType}</p>
        {item.itemDescription && <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-2">{item.itemDescription}</p>}
      </div>
    </div>
  );

  if (loading) return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />
      <div className="min-h-screen dark:bg-gray-600 bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-96 text-center">
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading items...</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce} />
      <div className="min-h-screen dark:bg-gray-600 bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Item Inventory</h1>
            <p className="text-gray-600 dark:text-gray-200">Browse and manage your items ({items.length} items)</p>
          </div>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
              <p className="text-gray-600 dark:text-gray-300">Start by adding some items to your inventory</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item._id || item.id}><ItemCard item={item} /></div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
