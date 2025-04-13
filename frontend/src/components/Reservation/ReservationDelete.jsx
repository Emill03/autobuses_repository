import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/edit.css";

const ReservationDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener datos de la reserva
    fetch(`http://localhost:5000/reservations/${id}`)
      .then(res => res.json())
      .then(setReservation)
      .catch(err => setError('No se pudo cargar la reserva'));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta reserva?')) {
      fetch(`http://localhost:5000/reservations/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          navigate('/reservations');
        })
        .catch(err => alert('Error al eliminar la reserva'));
    }
  };

  if (!reservation) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Eliminar Reserva</h2>
      <div>
        <p><strong>ID de Reserva:</strong> {reservation.id}</p>
        <p><strong>Nombre del pasajero:</strong> {reservation.passengerName}</p>
        <p><strong>Número de asiento:</strong> {reservation.seatNumber}</p>
        <p><strong>Fecha de reserva:</strong> {reservation.reservationDate}</p>
      </div>
      <button 
        onClick={handleDelete} 
        style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
      >
        Confirmar Eliminación
      </button>
    </div>
  );
};

export default ReservationDelete;