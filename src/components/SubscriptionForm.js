import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/SubscriptionForm.css';

function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/subscriptions', { email });
      setMessage('Вы подписались на рассылку');
      setEmail('');
    } catch (error) {
      console.error('Error sending subscription:', error);
      setMessage('Произошла ошибка при подписке. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <div className="subscription-form">
      <h3>БУДЬТЕ В КУРСЕ</h3>
      <p>Узнайте первыми о новых акциях и распродажах!</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Подписаться</button>
      </form>
      {message && <p className="subscription-message">{message}</p>}
    </div>
  );
}

export default SubscriptionForm;
