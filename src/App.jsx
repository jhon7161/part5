import React, { useState, useEffect } from 'react';
import Blog from './component/Blog';
import Notification from './component/Notification';
import LogoutButton from './component/LogoutButton';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import BlogForm from './formularios/blogForm'; // Ajusta la importación según la ubicación real
import LoginForm from './formularios/loginForm'; // Ajusta la importación según la ubicación real
import Togglable from './component/tooglevisible'; // Asegúrate de tener el Togglable.js en la ubicación correcta

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
    event.preventDefault(); // Asegúrate de que event sea pasado como parámetro
  
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotificationMessage('Login successful');
      setIsError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Wrong username or password');
      setIsError(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };
  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setNotificationMessage('Logged out');
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addBlog = async (newBlog) => {
    try {
      if (!newBlog.title || !newBlog.author || !newBlog.url) {
        throw new Error('Title, author, and URL are required');
      }

      const newBlogObject = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });

      newBlogObject.user = user;
      setBlogs(blogs.concat(newBlogObject));
      setNewBlog({
        title: '',
        author: '',
        url: ''
      });
      setNotificationMessage(`Blog '${newBlogObject.title}' added successfully`);
      setIsError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage('Error adding blog');
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
        <Togglable buttonLabel="Login">
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
            <p>{user.name} logged-in</p>
            <LogoutButton setUser={setUser} handleLogout={handleLogout} />
          </div>
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
          />
        </div>
      )}

      <h2>Blogs</h2>
      {Array.isArray(blogs) && blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
