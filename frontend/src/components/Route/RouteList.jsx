import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/list.css";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/routes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        setRoutes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando rutas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Lista de Rutas</h1>
      <ul>
        {routes.map(route => (
          <li key={route.id}>
            <strong>Nombre:</strong> {route.routeName} | 
            <strong> Origen:</strong> {route.origin} | 
            <strong> Destino:</strong> {route.destination} | 
            <strong> Distancia:</strong> {route.distance} km
            <button 
              onClick={() => navigate(`/routes/edit/${route.id}`)}
              style={{ marginLeft: '10px' }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteList;
