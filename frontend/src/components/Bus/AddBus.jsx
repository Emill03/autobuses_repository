import React, { useState } from 'react';
import "../styles/add.css";

const AddBus = () => {
  const [busData, setBusData] = useState({
    busNumber: '',
    model: '',
    capacity: '',
    year: '',
    status: 'activo' // valor por defecto
  });

  const [message, setMessage] = useState('');

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({
      ...busData,
      [name]: value
    });
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const busPayload = {
      ...busData,
      capacity: parseInt(busData.capacity, 10),
      year: parseInt(busData.year, 10)
    };
  
    try {
      const response = await fetch('http://localhost:5000/buses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(busPayload)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage(`Autobús creado con éxito. ID: ${result.id}`);
        setBusData({
          busNumber: '',
          model: '',
          capacity: '',
          year: '',
          status: ''
        });
      } else {
        setMessage(`Error al crear el autobús: ${result.message || JSON.stringify(result)}`);
      }
  
    } catch (error) {
      console.error('Error en la petición:', error);
      setMessage('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="add-bus-container">
      <h2>Agregar Autobús</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-bus-form">
        <div className="form-group">
          <label htmlFor="busNumber">Número de Autobús:</label>
          <input 
            type="text" 
            id="busNumber" 
            name="busNumber" 
            value={busData.busNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Modelo:</label>
          <input 
            type="text" 
            id="model" 
            name="model" 
            value={busData.model} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacidad:</label>
          <input 
            type="number" 
            id="capacity" 
            name="capacity" 
            value={busData.capacity} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Año:</label>
          <input 
            type="number" 
            id="year" 
            name="year" 
            value={busData.year} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Estado:</label>
          <select 
            id="status" 
            name="status" 
            value={busData.status} 
            onChange={handleChange} 
            required
          >
            <option value="activo">Activo</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Agregar Autobús</button>
      </form>
    </div>
  );
};

export default AddBus;
