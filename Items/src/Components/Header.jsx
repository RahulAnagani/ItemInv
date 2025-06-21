import { Package } from "lucide-react";
import ThemeToggler from '../Components/ThemeToggler';
import { useNavigate } from "react-router-dom";

const Header=()=>{
  const nav=useNavigate();
    return (
        <header className="bg-white dark:bg-gray-400 dark:border-gray-500 shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 sm:gap-3">
<Package onClick={()=>{nav("/")}}  className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer text-blue-600" />
              <h1 onClick={()=>{nav("/")}} className="text-lg cursor-pointer sm:text-xl md:text-2xl font-bold text-gray-900">ItemManager</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Header;