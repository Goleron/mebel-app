// src/pages/OrderForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../hooks/useCart';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';
import '../assets/styles/OrderForm.css';

const OrderForm = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { cart, clearCart, getTotalPrice } = useCart();
  const [recaptchaVerified, setRecaptchaVerified] = React.useState(false);

  const onSubmit = (data) => {
    if (recaptchaVerified) {
      const total = getTotalPrice();
      const items = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');
      const templateParams = {
        ...data,
        items,
        total,
        cardNumber: data.paymentMethod === 'Карта' ? data.cardNumber : 'Наличные',
        email: data.email // Добавляем email
      };

      emailjs.send('service_zhsys3r', 'template_r8vhv16', templateParams, 'uE1z_spHZPWb_oi34')
        .then((response) => {
          alert('Заказ успешно отправлен!');
          clearCart();
          reset();
        }, (error) => {
          alert('Ошибка при отправке заказа. Попробуйте еще раз.');
        });
    } else {
      alert('Пожалуйста, подтвердите, что вы не робот.');
    }
  };

  const handleRecaptcha = (value) => {
    setRecaptchaVerified(!!value);
  };

  const paymentMethod = watch('paymentMethod', 'Карта');

  return (
    <div className="order-form-container">
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">ФИО:</label>
          <input id="name" {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input id="address" {...register('address', { required: true })} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label htmlFor="paymentMethod">Способ оплаты:</label>
          <select id="paymentMethod" {...register('paymentMethod', { required: true })}>
            <option value="Карта">Карта</option>
            <option value="Наличные">Наличные</option>
          </select>
        </div>
        {paymentMethod === 'Карта' && (
          <div>
            <label htmlFor="cardNumber">Номер карты:</label>
            <input id="cardNumber" {...register('cardNumber', { required: paymentMethod === 'Карта' })} />
          </div>
        )}
        <div>
          <ReCAPTCHA sitekey="6LfHhP4pAAAAAITo9b4TOHLUTiiGbhKWB_gnZ2eJ" onChange={handleRecaptcha} />
        </div>
        <button type="submit">Оформить заказ</button>
      </form>
      <div>
        Итоговая сумма: {getTotalPrice()} ₽
      </div>
    </div>
  );
};

export default OrderForm;
