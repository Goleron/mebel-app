import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import '../assets/styles/Catalog.css';
import { motion } from 'framer-motion';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    keyword: '',
    sortBy: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(filters.maxPrice));
    }

    if (filters.keyword) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="catalog container">
      <h1 className="my-4">Каталог мебели</h1>
      <div className="catalog__filters mb-4">
        <select name="category" onChange={handleFilterChange} className="form-select">
          <option value="">Все категории</option>
          <option value="Диваны">Диваны</option>
          <option value="Мягкая мебель">Мягкая мебель</option>
          <option value="Шкафы">Шкафы</option>
          <option value="Кухни и Столовые группы">Кухни и Столовые группы</option>
          <option value="Матрасы">Матрасы</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Мин. цена"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="form-control"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Макс. цена"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="form-control"
        />
        <input
          type="text"
          name="keyword"
          placeholder="Поиск по названию"
          value={filters.keyword}
          onChange={handleFilterChange}
          className="form-control"
        />
        <select name="sortBy" onChange={handleFilterChange} className="form-select">
          <option value="">Сортировка</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>
      </div>
      <div className="catalog__products row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              className="col-md-4"
              key={product.id}
              whileHover={{ scale: 1.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
