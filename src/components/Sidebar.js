import React, { useState } from 'react';
import '../assets/styles/Sidebar.css';

function Sidebar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Искать</button>
      </form>
      <ul>
        <li>Диваны</li>
        <li>Мягкая мебель</li>
        <li>Шкафы</li>
        <li>Кухни и столовые группы</li>
        <li>Распродажа</li>
      </ul>
    </div>
  );
}

export default Sidebar;
