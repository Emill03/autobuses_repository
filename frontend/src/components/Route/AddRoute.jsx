import React, { useState } from 'react';
import "../styles/add.css";

const AddRoute = () => {
  const [routeData, setRouteData] = useState({
    routeName: '',
    origin: '',
    destination: '',
    distance: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({
      ...routeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const routePayload = {
      ...routeData,
      distance: parseFloat(routeData.distance)
    };

    try {
      const response = await fetch('http://localhost:5000/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(routePayload)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Ruta creada con éxito. ID: ${result.id}`);
        setRouteData({
          routeName: '',
          origin: '',
          destination: '',
          distance: ''
        });
      } else {
        setMessage(`Error al crear la ruta: ${result.message || JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setMessage('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="add-bus-container">
    <h2>Agregar Ruta</h2>
    {message && <p className="message">{message}</p>}
    <form onSubmit={handleSubmit} className="add-bus-form">
        <div className="form-group">
        <label htmlFor="routeName">Nombre de la Ruta:</label>
        <input 
            type="text" 
            id="routeName" 
            name="routeName" 
            value={routeData.routeName} 
            onChange={handleChange} 
            required 
        />
        </div>
        <div className="form-group">
        <label htmlFor="origin">Origen:</label>
        <input 
            type="text" 
            id="origin" 
            name="origin" 
            value={routeData.origin} 
            onChange={handleChange} 
            required 
        />
        </div>
        <div className="form-group">
        <label htmlFor="destination">Destino:</label>
        <input 
            type="text" 
            id="destination" 
            name="destination" 
            value={routeData.destination} 
            onChange={handleChange} 
            required 
        />
        </div>
        <div className="form-group">
        <label htmlFor="distance">Distancia:</label>
        <input 
            type="number" 
            step="0.01"
            id="distance" 
            name="distance" 
            value={routeData.distance} 
            onChange={handleChange} 
            required 
        />
        </div>
        <button type="submit" className="btn-submit">Agregar Ruta</button>
    </form>
    </div>
  );
};
export default AddRoute;

