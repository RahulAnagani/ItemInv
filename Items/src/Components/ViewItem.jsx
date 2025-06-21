import { List } from "lucide-react";
import { Link } from "react-router-dom";
const ViewItem=()=>{
    return (
        <Link
              to={"/view"}
              className="group cursor-pointer bg-green-600 hover:bg-green-700 text-white p-8 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors duration-200">
                  <List className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">View All Items</h3>
                  <p className="text-green-100 text-sm">
                    Browse and manage your items
                  </p>
                </div>
              </div>
            </Link>
    )
}
export default ViewItem;