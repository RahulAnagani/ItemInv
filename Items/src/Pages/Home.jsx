import {   Package } from 'lucide-react';
import AddItem from '../Components/AddItem';
import ViewItem from '../Components/ViewItem';
import Toggle from '../Components/Toggle';
import ThemeToggler from '../Components/ThemeToggler';
import Header from '../Components/Header';

const batman = () => {

      return (
    <>
  <div className="min-h-screen dark:bg-gray-600 bg-gray-50 flex flex-col">
    
  <Header />

    <main className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            Welcome to ItemManager
        </h2>
            </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
      <AddItem onl />
            <ViewItem />
        </div>

      </div>
    </main>

<footer className="bg-white border-t  dark:bg-gray-400 dark:border-gray-500 border-b-0  border-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-6 text-center">
<p className="text-gray-500 dark:text-white text-sm">
      © 2025 ItemManager. Built with ReactJS.
</p>
    </div>
</footer>

  </div>
    </>
    )
}

export default batman;
