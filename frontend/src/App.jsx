import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";

// Common
import Navbar from './components/Navbar';
import FooterPage from './components/common/FooterPage';
import Layout from './components/common/Layout';

// Auth
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

// Home
import Home from "./components/Home";

// Products
import ProductList from './pages/products/ProductList';
import SingleProductPage from "./pages/products/SingleProductPage";
import PopularJewelryPage from "./pages/products/PopularJewelryPage";
import SalesProduct from "./pages/products/SalesProduct";
import NewProduct from "./pages/products/NewProduct";
import BogoProducts from "./pages/products/BogoProducts";
import LexuryProduct from "./pages/products/LexuryProduct";
import FilteredProducts from "./components/common/FilteredProducts";
import CreateProduct from "./pages/admin/products/CreateProduct";
import Reviews from "./pages/products/Reveiw/Reviews";

// Categories
import CategoryPage from "./pages/categores/CategoryPage";

// Orders
import OrderHistory from "./pages/order/OrderHistory";
import CartPage from "./pages/order/CartPage";
import PaymentPage from "./pages/order/PaymentPage";
import OrderConfirmation from "./pages/order/OrderConfirmation";

// User & Others
import Profile from "./pages/profile/Profile";
import WishList from "./pages/wishlist/WishList";
import AccountDeletion from "./pages/users/AccountDeletion";
import Notifications from "./pages/notification/Notification";

function App() {
  const [filter, setFilter] = useState({});

  const handleFilterChange = (filterType) => {
    setFilter({ filter: filterType });
  };

  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route path="/products/:id/reviews" element={<Reviews />} />
          <Route path="/filtered-products" element={<FilteredProducts />} />

          {/* Sales/Promotions */}
          <Route path="/sale" element={<SalesProduct />} />
          <Route path="/sale/:id" element={<SingleProductPage />} />
          <Route path="/bestsale" element={<PopularJewelryPage />} />
          <Route path="/bestsale/:id" element={<SingleProductPage />} />
          <Route path="/new-products" element={<NewProduct />} />
          <Route path="/new-products/:id" element={<SingleProductPage />} />
          <Route path="/bogo" element={<BogoProducts />} />
          <Route path="/bogo/:id" element={<SingleProductPage />} />
          <Route path="/expensive" element={<LexuryProduct />} />
          <Route path="/expensive/:id" element={<SingleProductPage />} />

          {/* Categories */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Orders */}
          <Route path="/orders/:userId" element={<OrderHistory />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* User */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/account-delete" element={<AccountDeletion />} />

          {/* Admin */}
          <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </Layout>
      <FooterPage />
    </Router>
  );
}

export default App;

