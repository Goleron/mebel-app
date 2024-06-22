import React, { useState } from 'react';
import './Filter.css';

function Filter({ categories, onFilter }) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sizeRange, setSizeRange] = useState({ min: '', max: '' });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSizeRange({ ...sizeRange, [name]: value });
  };

  const handleFilter = () => {
    onFilter({ priceRange, sizeRange });
  };

  return (
    <div className="filter">
      <h2>Категории</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onFilter({ category })}>
            {category}
          </li>
        ))}
      </ul>
      <button onClick={handleFilter}>Применить</button>
    </div>
  );
}

export default Filter;
