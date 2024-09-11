import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import Homepage from "../Pages/Home/Homepage";
import Shop from "../Pages/Shop/Shop";
import Contact from "../Pages/Contact/Contact";
import Header from "../Pages/Layout/Header/Header";
import Footer from '../Pages/Layout/Footer/Footer';
import Product from "../Pages/Product/Product";
import Cart from "../Pages/Cart/Cart";
import './App.css';

export default function App() {
  const [productsinCart, setProductsInCard] = useState([]);
  return (
    <CartContext.Provider value={[productsinCart, setProductsInCard]}>
      <div id="main">
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" element={<Homepage />} />
            <Route path="shop/:category" element={<Shop />} />
            <Route path="shop/product/:productId" element={<Product />} />
            <Route path="shop" element={<Shop />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </CartContext.Provider>
    
  );
}

