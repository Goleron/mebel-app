import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import '../assets/styles/Feedback.css';

const Feedback = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const templateParams = {
      from_name: data.name,
      to_name: "Крутой поцик",
      message: data.message,
      reply_to: data.email,
    };

    emailjs.send('service_zhsys3r', 'template_feedback', templateParams, 'uE1z_spHZPWb_oi34')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Сообщение отправлено!');
        reset();
      }, (error) => {
        console.error('FAILED...', error);
        alert('Ошибка при отправке сообщения.');
      });
  };

  return (
    <div className="feedback-form-container">
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && <span>Это поле обязательно для заполнения</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Это поле обязательно для заполнения</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            {...register('message', { required: true })}
          ></textarea>
          {errors.message && <span>Это поле обязательно для заполнения</span>}
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
};

export default Feedback;
