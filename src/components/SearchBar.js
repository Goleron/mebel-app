import React, { useState } from 'react';
import '../assets/styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Поиск товаров"
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Поиск</button>
    </form>
  );
}

export default SearchBar;
