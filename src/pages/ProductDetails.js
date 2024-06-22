import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import '../assets/styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`http://localhost:3001/products/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <div className="product-details-container">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Назад</button>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h2>{product.price} ₽</h2>
      <button className="btn btn-primary" onClick={() => alert('Added to cart')}>Добавить в корзину</button>
      <button className="btn btn-secondary" onClick={() => alert('Added to favorites')}>Добавить в избранное</button>
    </div>
  );
};

export default ProductDetails;
