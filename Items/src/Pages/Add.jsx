import { useState } from 'react';
import { Upload,X, Save } from 'lucide-react';
import Header from '../Components/Header';
import {ToastContainer,toast,Bounce} from "react-toastify"
import axios from "axios"

const AddItemPage=()=>{
const [batman, setBatman] = useState({
  rahul: '',
  superman: '',
  ironman: '',
  joker: null,
  robin: []
});

  const spiderman = [
'Shirt','Pant','Shoes','Sports Gear',
  'Accessories', 'Electronics','Books','Other'
  ];

  const flash=import.meta.env.VITE_API_URL;
  const [load,setLoad]=useState(false);
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatman(prev => ({
      ...prev, [name]: value
    }));
};

 const handleCoverChange = (e) => {
   const file = e.target.files[0];
      if (file) {
  setBatman(prev => ({
     ...prev, joker: file
    }));
  }
};

 const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files);
   setBatman(prev => ({
  ...prev, robin: [...prev.robin, ...files]
  }));
  };

   const removeAdditional = (i) => {
     setBatman(prev => ({
     ...prev,
     robin: prev.robin.filter((_, index) => index !== i)
    }));
  };

const handleSubmit = async(e) => {
  setLoad(true);
  const { rahul, superman, ironman, joker, robin } = batman;
    if (!rahul || !superman || !ironman || !joker || robin.length === 0) {
      toast.warn('All fields are required!', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      setLoad(false)
      return;
  }
  else{
     const data = new FormData();
     data.append("itemName", rahul);
     data.append("itemType", superman);
     data.append("itemDescription", ironman);
     data.append("coverImage", joker);
     robin.forEach((img) => data.append("additionalImages", img));
     
    try {
      const res = await axios.post(`${flash}/item/addItem`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoad(false)
  toast.success(res?.data?.msg || "Item uploaded successfully", {
    position: "top-right",
    autoClose: 5000,
    theme: "light",
    transition: Bounce,
  });

  setBatman({
    rahul: '',
    superman: '',
    ironman: '',
    joker: null,
    robin: []
  });

   } catch (err) {
    setLoad(false)
toast.error(err?.response?.data?.msg || "Upload failed", {
   position: "top-right",
   autoClose: 5000,
   theme: "light",
   transition: Bounce,
 });
   }
 }
};

const goBackToBatCave = () => {
    console.log('Going back to home page');
};

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
<main className="max-w-2xl mx-auto px-6 py-8">
  <div className="bg-white dark:bg-gray-400 rounded-xl shadow-sm border border-gray-200 dark:border-gray-500 p-6 sm:p-8">
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Item</h2>
    </div>

    <div className="space-y-6">

      <div>
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
        <input
          type="text"
          id="itemName"
          name="rahul"
          value={batman.rahul}
          onChange={handleInputChange}
          required
          className="w-full outline-0 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter item name"
        />
      </div>

      <div>
        <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-2">Item Type *</label>
        <select
          id="itemType"
          name="superman"
          value={batman.superman}
          onChange={handleInputChange}
          required
          className="w-full px-4 outline-0 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <option value="">Select item type</option>
          {spiderman.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-2">Item Description</label>
        <textarea
          id="itemDescription"
          name="ironman"
          value={batman.ironman}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 outline-0 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          placeholder="Enter item description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">

        {!batman.joker ? (
          <>
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="mb-4">
            <label
              htmlFor="coverImage"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Choose Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
              required
            />
          </div>
          </>
        ) : (
          <>
          <div className="w-full h-full flex flex-col items-center justify-center  rouned">
            <img src={URL.createObjectURL(batman.joker)} className='w-[50%] object-contain h-[50%]' />
            <div onClick={()=>setBatman(prev=>({...prev,joker:null}))} className="flex py-2 text-red-500 cursor-pointer hover:underline">
              Select another
              <X />
            </div>
          </div>
          </>
        )}

        {batman.joker && (
          <p className="text-sm text-gray-600">Selected: {batman.joker.name}</p>
        )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Additional Images (Optional)</label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-400 transition-colors duration-200">
          <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 dark:text-gray-300 mx-auto mb-3" />
          <div className="mb-3">
            <label
              htmlFor="additionalImages"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Add More Images
            </label>
            <input
              type="file"
              id="additionalImages"
              accept="image/*"
              multiple
              onChange={handleAdditionalChange}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">You can select multiple images</p>
        </div>

        {batman.robin.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Additional Images ({batman.robin.length})
            </p>
            <div className="space-y-2">
              {batman.robin.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-500 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-200">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAdditional(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <button
          type="button"
          onClick={()=>{
              if (!load) handleSubmit();
          }}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium `}
        >
          {!load&&<>
          <Save className="w-5 h-5" />
          Add Item
          </>}
          {load && <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>}
        </button>
      </div>

    </div>
  </div>
</main>
</div>
</>
)
}

export default AddItemPage;
