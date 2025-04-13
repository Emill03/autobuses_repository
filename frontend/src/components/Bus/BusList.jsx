import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/list.css";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/buses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        setBuses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando autobuses...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Lista de Autobuses</h1>
      <ul>
        {buses.map(bus => (
          <li key={bus.id}>
            <strong>Número:</strong> {bus.busNumber} | 
            <strong> Modelo:</strong> {bus.model} | 
            <strong> Capacidad:</strong> {bus.capacity} | 
            <strong> Año:</strong> {bus.year} | 
            <strong> Estado:</strong> {bus.status}
            <button 
              onClick={() => navigate(`/buses/edit/${bus.id}`)}
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

export default BusList;
