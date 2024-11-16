// src/contexts/UserContext.js
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [country, setCountry] = useState(localStorage.getItem('country') || '');

  useEffect(() => {
    const role = Cookies.get('role') || null;
    const country = Cookies.get('country');
    setRole(role);
    setCountry(country);
  }, []);

  const login = () => {
    const role = Cookies.get('role');
    const country = Cookies.get('country');
    setRole(role);
    setCountry(country);
    localStorage.setItem('country', country);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('role');
    Cookies.remove('country');
    Cookies.remove('email');
    setRole(null);
    setCountry('');
    localStorage.removeItem('country');
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    localStorage.setItem('country', selectedCountry);
  };

  return (
    <UserContext.Provider value={{ role, country, login, logout, handleCountrySelect }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
