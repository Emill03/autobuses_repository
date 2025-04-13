import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/list.css";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/schedules')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        return response.json();
      })
      .then((data) => {
        setSchedules(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando horarios...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Lista de Horarios</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <strong>ID:</strong> {schedule.id} | 
            <strong> Bus ID:</strong> {schedule.busId} | 
            <strong> Ruta ID:</strong> {schedule.routeId} | 
            <strong> Salida:</strong> {schedule.departureTime} | 
            <strong> Llegada:</strong> {schedule.arrivalTime}
            <button 
              onClick={() => navigate(`/schedules/edit/${schedule.id}`)}
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

export default ScheduleList;