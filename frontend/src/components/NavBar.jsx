import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Autobuses</Link>
      <Link to="/buses/add">Agregar Autobús</Link>
      <Link to="/routes">Rutas</Link>
      <Link to="/routes/add">Agregar Ruta</Link>
      <Link to="/schedules">Horarios</Link>
      <Link to="/schedules/add">Agregar Horario</Link>
      <Link to="/reservations">Reservas</Link>
      <Link to="/reservations/add">Agregar Reserva</Link>
    </nav>
  );
};

export default Navbar;