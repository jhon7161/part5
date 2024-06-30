import React, { useState, useEffect, useRef } from 'react';
import Blog from './component/Blog';
import Notification from './component/Notification';
import LogoutButton from './component/LogoutButton';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import BlogForm from './formularios/blogForm';
import LoginForm from './formularios/loginForm';
import Togglable from './component/tooglevisible';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage('Inicio de sesión exitoso');
      setIsError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Usuario o contraseña incorrectos');
      setIsError(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setNotificationMessage('Sesión cerrada');
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLike = async (blogId) => {
    try {
      const blogToUpdate = blogs.find(blog => blog.id === blogId);
      if (!blogToUpdate) {
        throw new Error('Blog not found');
      }

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: blogToUpdate.user.id // Asegúrate de pasar solo el ID del usuario
      };

      const returnedBlog = await blogService.updateLikes(blogId, updatedBlog);
      setBlogs(blogs.map(b => (b.id !== blogId ? b : returnedBlog)));
    } catch (exception) {
      console.error('Error updating likes', exception);
    }
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      if (!newBlog.title || !newBlog.author || !newBlog.url) {
        throw new Error('Título, autor y URL son obligatorios');
      }

      const newBlogObject = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });

      newBlogObject.user = user; // Asigna el usuario completo al nuevo blog
      setBlogs(blogs.concat(newBlogObject));
      setNewBlog({
        title: '',
        author: '',
        url: ''
      });
      setNotificationMessage(`Blog '${newBlogObject.title}' añadido exitosamente`);
      setIsError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Error al añadir el blog');
      setIsError(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={notificationMessage} isError={isError} />
      
      {user === null ? (
        <Togglable buttonLabel="Iniciar sesión">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <div>
            <p>{user.name} ha iniciado sesión</p>
            <LogoutButton setUser={setUser} handleLogout={handleLogout} />
          </div>
          <Togglable buttonLabel="Nuevo Blog" ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}
              newBlog={newBlog}
              handleBlogChange={handleBlogChange}
            />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              handleLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
