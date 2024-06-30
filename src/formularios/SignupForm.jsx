// SignupForm.js
import React, { useState } from 'react';
import loginService from '../services/login';

const SignupForm = ({ setNotificationMessage, setIsError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.signup({ username, password, name });
      setNotificationMessage('Usuario creado exitosamente. Por favor, inicia sesión.');
      setIsError(false);
      setUsername('');
      setPassword('');
      setName('');
    } catch (exception) {
      setNotificationMessage('Error al crear el usuario');
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default SignupForm;
