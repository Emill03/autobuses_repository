import React, { useState, useEffect } from 'react';
import "../styles/add.css";

const AddReservation = () => {
  const [reservationData, setReservationData] = useState({
    scheduleId: '',
    passengerName: '',
    seatNumber: '',
    reservationDate: ''
  });
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar horarios disponibles
    fetch('http://localhost:5000/schedules')
      .then(res => res.json())
      .then(data => setSchedules(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(`Reserva creada con ID: ${result.id}`);
        setReservationData({
          scheduleId: '',
          passengerName: '',
          seatNumber: '',
          reservationDate: ''
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
    <h2>Agregar Reserva</h2>
    {message && <p className="message">{message}</p>}
    <form onSubmit={handleSubmit} className="add-bus-form">
        <div className="form-group">
        <label>Horario:</label>
        <select 
            name="scheduleId" 
            value={reservationData.scheduleId} 
            onChange={handleChange} 
            required
        >
            <option value="">Seleccione un horario</option>
            {schedules.map(schedule => (
            <option key={schedule.id} value={schedule.id}>
                {`Bus: ${schedule.bus.busNumber} - Ruta: ${schedule.route.routeName} - Salida: ${new Date(schedule.departureTime).toLocaleString()}`}
            </option>
            ))}
        </select>
        </div>
        <div className="form-group">
        <label>Nombre del pasajero:</label>
        <input
            type="text"
            name="passengerName"
            value={reservationData.passengerName}
            onChange={handleChange}
            required
        />
        </div>
        <button type="submit" className="btn-submit">Agregar Reserva</button>
    </form>
    </div>
  );
};

export default AddReservation;
