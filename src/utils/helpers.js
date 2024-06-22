export const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(price);
  };
  
  export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  };
  
  export const addItemToStorage = (key, item) => {
    const items = getFromLocalStorage(key);
    items.push(item);
    saveToLocalStorage(key, items);
  };
  
  export const removeItemFromStorage = (key, id) => {
    const items = getFromLocalStorage(key);
    const filteredItems = items.filter(item => item.id !== id);
    saveToLocalStorage(key, filteredItems);
  };
  