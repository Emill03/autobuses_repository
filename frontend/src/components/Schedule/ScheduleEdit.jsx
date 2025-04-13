import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/edit.css";

const ScheduleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/schedules/${id}`)
      .then(res => res.json())
      .then(setSchedule)
      .catch(err => setError('No se pudo cargar el horario'));

    fetch('http://localhost:5000/buses')
      .then(res => res.json())
      .then(setBuses);

    fetch('http://localhost:5000/routes')
      .then(res => res.json())
      .then(setRoutes);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate('/schedules');
      })
      .catch(err => alert('Error al actualizar'));
  };

  const handleDelete = () => {
    if (!window.confirm('¿Eliminar este horario?')) return;

    fetch(`http://localhost:5000/schedules/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate('/schedules');
      })
      .catch(err => alert('Error al eliminar'));
  };

  if (!schedule) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Editar Horario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bus:</label>
          <select name="busId" value={schedule.busId} onChange={handleChange} required>
            <option value="">Seleccione un autobús</option>
            {buses.map(bus => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ruta:</label>
          <select name="routeId" value={schedule.routeId} onChange={handleChange} required>
            <option value="">Seleccione una ruta</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>
                {route.routeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora de salida:</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={schedule.departureTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hora de llegada:</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={schedule.arrivalTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar Horario</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
        Eliminar Horario
      </button>
    </div>
  );
};

export default ScheduleEdit;
