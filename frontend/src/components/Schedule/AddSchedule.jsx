import React, { useEffect, useState } from 'react';
import "../styles/add.css";

const AddSchedule = () => {
  const [scheduleData, setScheduleData] = useState({
    busId: '',
    routeId: '',
    departureTime: '',
    arrivalTime: ''
  });
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/buses')
      .then(res => res.json())
      .then(data => setBuses(data));

    fetch('http://localhost:5000/routes')
      .then(res => res.json())
      .then(data => setRoutes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Horario creado con ID: ${result.id}`);
        setScheduleData({
          busId: '',
          routeId: '',
          departureTime: '',
          arrivalTime: ''
        });
      } else {
        setMessage(`Error: ${result.message || JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error de conexión con el servidor');
    }
  };

  return (
    <div className="add-bus-container">
    <h2>Agregar Horario</h2>
    {message && <p className="message">{message}</p>}
    <form onSubmit={handleSubmit} className="add-bus-form">
        <div className="form-group">
        <label>Bus:</label>
        <select 
            name="busId" 
            value={scheduleData.busId} 
            onChange={handleChange} 
            required
        >
            <option value="">Seleccione un autobús</option>
            {buses.map(bus => (
            <option key={bus.id} value={bus.id}>
                {bus.busNumber}
            </option>
            ))}
        </select>
        </div>
        <div className="form-group">
        <label>Ruta:</label>
        <select 
            name="routeId" 
            value={scheduleData.routeId} 
            onChange={handleChange} 
            required
        >
            <option value="">Seleccione una ruta</option>
            {routes.map(route => (
            <option key={route.id} value={route.id}>
                {route.routeName}
            </option>
            ))}
        </select>
        </div>
        <div className="form-group">
        <label>Hora de salida:</label>
        <input
            type="datetime-local"
            name="departureTime"
            value={scheduleData.departureTime}
            onChange={handleChange}
            required
        />
        </div>
        <div className="form-group">
        <label>Hora de llegada:</label>
        <input
            type="datetime-local"
            name="arrivalTime"
            value={scheduleData.arrivalTime}
            onChange={handleChange}
            required
        />
        </div>
        <button type="submit" className="btn-submit">Agregar Horario</button>
    </form>
    </div>
  );
};

export default AddSchedule;
