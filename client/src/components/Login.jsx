import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      const role = Cookies.get('role');
      login();
      role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    }
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#^%*?&])[A-Za-z\d@$!#^%*?&]{8,}$/.test(password);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (!validatePassword(password)) {
      setError('Invalid password');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROUTE}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      Cookies.set('email', email);
      const { accessToken, role, country } = response.data;
      Cookies.set('accessToken', accessToken);
      Cookies.set('role', role);
      Cookies.set('country', country);
      login();
      console.log(Cookies.get('email'));
      role === 'Admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error && validateEmail(e.target.value)) setError(null);
              }}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {error && !validateEmail(email) && <p className="text-red-500 text-sm mt-1">Invalid email</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error && validatePassword(e.target.value)) setError(null);
                }}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-gray-600 hover:text-blue-500"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {error && !validatePassword(password) && (
              <p className="text-red-500 text-sm mt-1">Invalid password</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
