import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, ImageIcon } from 'lucide-react';
import Header from '../Components/Header';
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";

const ItemDetailPage = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');

  const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (itemId) {
        fetchItem();
      }
    }, [itemId]);

    const fetchItem = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${api}/item/getItem?ItemId=${itemId}`);
            const itemData = response.data.item || response.data;
            setItem(itemData);
            setSelectedImage(`${api}/uploads/${itemData.coverImage}`);
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Failed to fetch item details", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="min-h-screen dark:bg-gray-600 bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading item details...</p>
              </div>
            </div>
          </main>
        </div>
      </>
        );
    }

    if (!item) {
        return (
            <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="min-h-screen dark:bg-gray-600 bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Item not found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The item you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </main>
        </div>
      </>
        );
    }

    return (
        <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="min-h-screen dark:bg-gray-600 bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Items
              </button>
            </div>

            <div className="bg-white dark:bg-gray-400 rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-6 lg:p-8">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-300 rounded-lg overflow-hidden mb-4">
                    <img
                      src={selectedImage}
                      alt={item.itemName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {item.additionalImages && item.additionalImages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Additional Images
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={() =>
                            setSelectedImage(`${api}/uploads/${item.coverImage}`)
                          }
                          className={`aspect-square bg-gray-100 dark:bg-gray-300 rounded-md overflow-hidden border-2 transition-colors duration-200 ${
                            selectedImage === `${api}/uploads/${item.coverImage}`
                              ? 'border-blue-500'
                              : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <img
                            src={`${api}/uploads/${item.coverImage}`}
                            alt="Cover"
                            className="w-full h-full object-contain"
                          />
                        </button>

                        {item.additionalImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setSelectedImage(`${api}/uploads/${image}`)
                            }
                            className={`aspect-square bg-gray-100 dark:bg-gray-300 rounded-md overflow-hidden border-2 transition-colors duration-200 ${
                              selectedImage === `${api}/uploads/${image}`
                                ? 'border-blue-500'
                                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            <img
                              src={`${api}/uploads/${image}`}
                              alt={`Additional ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-500">
                  <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {item.itemName}
                    </h1>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                      {item.itemType}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Description
                    </h2>
                    <div className="bg-gray-50 dark:bg-gray-500 rounded-lg p-4">
                      {item.itemDescription ? (
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                          {item.itemDescription}
                        </p>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">
                          No description available for this item.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Item Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-500 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-1">
                          Item Type
                        </h3>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {item.itemType}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-500 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-1">
                          Item ID
                        </h3>
                        <p className="text-gray-900 dark:text-white font-mono text-sm">
                          {item._id || item.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {item.additionalImages && item.additionalImages.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-500">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {item.additionalImages.length + 1} image
                          {item.additionalImages.length + 1 !== 1 ? 's' : ''} available
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
};
export default ItemDetailPage;
