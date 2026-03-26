import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

const Register = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Page d'inscription</h2>
      <p>Formulaire à ajouter plus tard</p>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Tableau de bord</h2>
      <p>Contenu du tableau de bord à ajouter</p>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setCurrentUser(userData.email);
    }
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    setCurrentUser(email);    
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/dashboard"
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
            }
          />
      </Routes>
    </Router>
  );
}

export default App;