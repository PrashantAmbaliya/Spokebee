import './App.css';
import { Toaster } from 'react-hot-toast';
import { Routes, Route,Outlet } from "react-router-dom";
import SellerDashboardLayout from './pages/SellerDashboardLayout'
import Home from './pages/Home'
import SellerLogin from './pages/SellerLogin'
import Products from './pages/Products'
import AddProduct from './components/AddProduct'
import Editor from './pages/Editor';
import ProtectedRoute from './auth/ProtectedRoutes'
import ProductsGrid from './components/ProductGrid';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/seller" element={<Outlet/>}>
            <Route path="login" element={<SellerLogin />} />
            <Route path="dashboard" element={<ProtectedRoute><SellerDashboardLayout /></ProtectedRoute>}>
              <Route path="addProduct" element={<AddProduct />} />
              <Route path="products" element={<ProductsGrid />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;