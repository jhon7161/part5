import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  const handleSubmit = async (event) => {
    event.preventDefault() // Asegura que event sea pasado como parámetro
    try {
      await handleLogin(event) // Llama a handleLogin con event para prevenir el envío predeterminado
    } catch (exception) {
      console.error('Error during login:', exception)
      // Manejar errores como mostrar un mensaje al usuario
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
