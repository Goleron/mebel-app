import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { getProductById } from '../api/api';
import '../assets/styles/ProductDetails.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  React.useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const isFavorite = favorites.some(item => item.id === product?.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.price} ₽</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>В корзину</button>
      <button onClick={handleAddToFavorites}>
        {isFavorite ? 'Убрать из избранного' : 'В избранное'}
      </button>
    </div>
  );
}

export default ProductPage;
