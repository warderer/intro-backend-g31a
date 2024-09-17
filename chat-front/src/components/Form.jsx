import { useState } from 'react';
import { socket } from '../socket';
const Form = () => {
  const [value, setValue] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && user) {
      socket.emit('message', { user, text: value });
      setValue('');
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleUserChange}
          type='text'
          placeholder='Tu nombre'
          value={user}
        />
        <input
          onChange={handleChange}
          type='text'
          placeholder='Escribe un mensaje'
          value={value}
        />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default Form;
