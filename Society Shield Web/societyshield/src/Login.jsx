import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error,setError] = useState(''); //To handle errors
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      // Make the API call to the login endpoint
      const response = await axios.post('http://localhost:3000/login', {
        email: formData.username,
        password: formData.password,
      });

       // Extract the token and user details from the API response
       const { token, user } = response.data;

       // Store the JWT token in localStorage for session management
       localStorage.setItem('token', token);
       localStorage.setItem('userType', user.userType); // Store user type to determine dashboard
 
       // Redirect based on userType
      if (user.userType === 'Admin') {
        navigate('/admin-dashboard'); // Redirect to Admin dashboard
      } else if (user.userType === 'Member') {
        navigate('/member-dashboard'); // Redirect to Member dashboard
      }


    }catch (err) {
      setError('Invalid login credentials.');
      console.error('Login error:', err);
    }
  };

  
  return (
  <div className="login-page">
    <div className="logo-container">
      <img src="/src/assets/7.png" alt="Logo" className="login-logo" />
    </div>
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Sign In</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </div>
  </div>
  );
}

export default Login;
