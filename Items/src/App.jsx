import './App.css'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import AddItemPage from './Pages/Add'
import ViewItemsPage from './Pages/View'
import ItemDetailPage from './Pages/Item'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home> }></Route>
        <Route path='/add' element={<AddItemPage></AddItemPage>}></Route>
        <Route path='/view' element={<ViewItemsPage></ViewItemsPage>}></Route>
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
      </Routes>
    </>
  )
}

export default App
