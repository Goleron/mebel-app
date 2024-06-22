// src/components/ProductCard.js
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';
import '../assets/styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.price} ₽</p>
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </button>
      <Link to={`/product/${product.id}`}>
        <button>Узнать подробнее</button>
      </Link>
    </div>
  );
};

export default ProductCard;
