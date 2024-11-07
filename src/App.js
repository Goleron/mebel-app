import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Feedback from './pages/Feedback';
import Order from './pages/Order';
import { CartProvider } from './hooks/useCart';
import { FavoritesProvider } from './hooks/useFavorites';
import Footer from './components/Footer';

function App() {
  return (
      <CartProvider>
        <FavoritesProvider>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </div>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
  );
}

export default App;
