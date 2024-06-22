// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import '../assets/styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.slice(0, 5));
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Добро пожаловать в наш магазин мебели!</h1>
        <p>Мы предлагаем широкий ассортимент мебели для вашего дома и офиса. Ознакомьтесь с нашими товарами и выберите то, что подходит именно вам.</p>
      </div>
      <div className="products-preview">
        <h2>Наши товары</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} ₽</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary">Узнать подробнее</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="info-section">
        <h2>Информация о нашем магазине</h2>
        <p>Наш магазин расположен в центре города и предлагает широкий ассортимент мебели для дома и офиса. Мы гордимся качеством наших товаров и предлагаем лучшие цены.</p>
        <Link to="/feedback" className="btn btn-primary">Обратная связь</Link>
      </div>
    </div>
  );
};

export default Home;
