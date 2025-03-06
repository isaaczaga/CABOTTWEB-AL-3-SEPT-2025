// Create a new file: src/components/ProtectedRoute.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('adminAuthenticated') === 'true'
  );
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'cabott2025') { // Change this to your desired password
      localStorage.setItem('adminAuthenticated', 'true');
      setAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Acceso Administrador</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Contraseña:</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
        <style jsx>{`
          .admin-login {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f9fa;
          }
          .login-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 350px;
          }
          .form-group {
            margin-bottom: 1rem;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
          }
          input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          button {
            background: #2a4d8f;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;