import {Plus} from "lucide-react"
import { Link } from "react-router-dom";
const AddItem=()=>{
    return (
        <>
        <Link to={"/add"}
              className="group cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors duration-200">
                  <Plus className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Add Item</h3>
                  <p className="text-blue-100 text-sm">
                    Add new items to your inventory
                  </p>
                </div>
              </div>
            </Link>
            </>
    )
}
export default AddItem;