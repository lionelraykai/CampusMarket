import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen/LoginScreen'
import HomeScreen from './components/HomeScreen/HomeScreen'
import SellItemScreen from './components/SellItemScreen/SellItemScreen'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handlePostListing = (data) => {
    console.log('Posting listing:', data);
    alert('Listing Published Successfully!');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <HomeScreen user={user} onLogout={handleLogout} />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )
        } 
      />
      <Route 
        path="/sell" 
        element={
          isAuthenticated ? (
            <SellItemScreen onPost={handlePostListing} />
          ) : (
            <Navigate to="/" />
          )
        } 
      />
    </Routes>
  );
}

export default App
