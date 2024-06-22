// src/pages/Favorites.js
import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { motion } from 'framer-motion';
import '../assets/styles/Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <motion.div
      className="favorites-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        Избранное
      </motion.h1>
      {favorites.length === 0 ? (
        <p>У вас нет избранных товаров</p>
      ) : (
        favorites.map((item) => (
          <motion.div
            key={item.id}
            className="favorites-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>Цена: {item.price} ₽</p>
              <div className="favorites-item-buttons">
                <button onClick={() => removeFromFavorites(item.id)}>Удалить из избранного</button>
                <button onClick={() => addToCart(item)}>Добавить в корзину</button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default Favorites;
