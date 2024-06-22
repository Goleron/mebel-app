// src/pages/Cart.js
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>Цена: {item.price} ₽</p>
              <p>Количество: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-summary">
        <p>Итоговая сумма: {getTotalPrice()} ₽</p>
        <button onClick={clearCart} className="btn btn-warning">
          Очистить корзину
        </button>
        <button onClick={() => navigate('/order')} className="btn btn-primary">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;
