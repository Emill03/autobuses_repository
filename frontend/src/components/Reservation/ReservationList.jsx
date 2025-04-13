import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/list.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/reservations')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }
        return response.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando reservas...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Lista de Reservas</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <strong>ID:</strong> {reservation.id} | 
            <strong> Horario ID:</strong> {reservation.scheduleId} | 
            <strong> Pasajero:</strong> {reservation.passengerName} | 
            <strong> Asiento:</strong> {reservation.seatNumber} | 
            <strong> Fecha:</strong> {reservation.reservationDate}
            <button 
              onClick={() => navigate(`/reservations/edit/${reservation.id}`)}
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

export default ReservationList;
