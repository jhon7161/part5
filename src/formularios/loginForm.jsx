import React from 'react';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Asegura que event sea pasado como parámetro
    try {
      await handleLogin(event); // Llama a handleLogin con event para prevenir el envío predeterminado
    } catch (exception) {
      console.error('Error during login:', exception);
      // Manejar errores como mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
