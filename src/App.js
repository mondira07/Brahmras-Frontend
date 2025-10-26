// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Login from './Pages/Login';
import HomeMain from './Component/HomeMain';
import Register from './Pages/Register';
import Product from './Component/Product';
import LabReports from './Component/LabReports';
import AboutUs from './Component/AboutUs';
import ProductDetails from './Component/ProductDetails';
import Review from './Component/Review';
import Cart from './Component/Cart';
import Checkout from './Component/CheckOut';
import Addtocart from './Component/Addtocart';
import ContactUs from './Component/ContactUs';
import Track from './Component/Track';
import BtoB from './Component/BtoB';
import AdminNavbar from './Component/AdminNavbar';
import NewCategory from './Admin/NewCategory';
import CategoryList from './Admin/CategoryList';
import NewSubCategory from './Admin/NewSubCategory';
import SubCategoryList from './Admin/SubCategoryList';
import AddProduct from './Admin/AddProduct';
import ProductList from './Admin/ProductList';
import UpdateProduct from './Admin/UpdateProduct';
import UpdateCategory from './Admin/UpdateCategory';
import UpdateSubCategory from './Admin/UpdateSubCategory';
import Dashboard from './Admin/Dashboard';
import Account from './Component/Account';
import Address from './Component/Address';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Context/ProtectedRoute';
import Subcategories from './Component/Subcategory';
import OrderConfirmation from './Component/OrderConfirmation';
const MainLayout = ({ children }) => (
  <>
    <CssBaseline />
    <Navbar />
    {children}
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <>
    <CssBaseline />
    <AdminNavbar />
    {children}
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><HomeMain /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
          <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
          <Route path="/lab-reports" element={<MainLayout><LabReports /></MainLayout>} />
          <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
          <Route path="/product-details" element={<MainLayout><ProductDetails /></MainLayout>} />
          <Route path="/contact-us" element={<MainLayout><ContactUs /></MainLayout>} />
          <Route path="/track-order" element={<MainLayout><Track /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/b2b" element={<MainLayout><BtoB /></MainLayout>} />
          <Route path="/subCategory" element={<MainLayout><Subcategories /></MainLayout>} />
          <Route path="/orderconfirmation/:orderId" element={<ProtectedRoute element={<MainLayout><OrderConfirmation /></MainLayout>} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<MainLayout><Checkout /></MainLayout>} />} />
          <Route path="/add-to-cart" element={<ProtectedRoute element={<MainLayout><Addtocart /></MainLayout>} />} />
          <Route path="/review" element={<ProtectedRoute element={<MainLayout><Review /></MainLayout>} />} />
          <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
          <Route path="/address" element={<MainLayout><Address /></MainLayout>} />
          
          <Route
      path="/newcategory"
      element={<ProtectedRoute element={<AdminLayout><NewCategory /></AdminLayout>} />}
    />
    <Route
      path="/categorylist"
      element={<ProtectedRoute element={<AdminLayout><CategoryList /></AdminLayout>} />}
    />
    <Route
      path="/newsubcategory"
      element={<ProtectedRoute element={<AdminLayout><NewSubCategory /></AdminLayout>} />}
    />
    <Route
      path="/subcategorylist"
      element={<ProtectedRoute element={<AdminLayout><SubCategoryList /></AdminLayout>} />}
    />
    <Route
      path="/addproduct"
      element={<ProtectedRoute element={<AdminLayout><AddProduct /></AdminLayout>} />}
    />
    <Route
      path="/productlist"
      element={<ProtectedRoute element={<AdminLayout><ProductList /></AdminLayout>} />}
    />
    <Route
      path="/updatecategory"
      element={<ProtectedRoute element={<AdminLayout><UpdateCategory /></AdminLayout>} />}
    />
    <Route
      path="/updateproduct"
      element={<ProtectedRoute element={<AdminLayout><UpdateProduct /></AdminLayout>} />}
    />
    <Route
      path="/updatesubcategory"
      element={<ProtectedRoute element={<AdminLayout><UpdateSubCategory /></AdminLayout>} />}
    />
    <Route
      path="/dashboard"
      element={<ProtectedRoute element={<AdminLayout><Dashboard /></AdminLayout>} />}
    />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
