import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes de Autobuses
import Navbar from './components/NavBar.jsx';
import AddBus from './components/Bus/AddBus.jsx';
import BusList from './components/Bus/BusList.jsx';
import BusEdit from './components/Bus/BusEdit.jsx';

// Componentes de Rutas
import RouteList from './components/route/RouteList.jsx';
import AddRoute from './components/route/AddRoute.jsx';
import RouteEdit from './components/route/RouteEdit.jsx';

// Componentes de Horarios
import ScheduleList from './components/Schedule/ScheduleList.jsx';
import AddSchedule from './components/Schedule/AddSchedule.jsx';
import ScheduleEdit from './components/Schedule/ScheduleEdit.jsx';

// Componentes de Reservas
import ReservationList from './components/Reservation/ReservationList.jsx';
import AddReservation from './components/Reservation/AddReservation.jsx';
import ReservationEdit from './components/Reservation/ReservationDelete.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas de autobuses */}
        <Route path="/" element={<BusList />} />
        <Route path="/buses/add" element={<AddBus />} />
        <Route path="/buses/edit/:id" element={<BusEdit />} />

        {/* Rutas de rutas */}
        <Route path="/routes" element={<RouteList />} />
        <Route path="/routes/add" element={<AddRoute />} />
        <Route path="/routes/edit/:id" element={<RouteEdit />} />

        {/* Rutas de horarios */}
        <Route path="/schedules" element={<ScheduleList />} />
        <Route path="/schedules/add" element={<AddSchedule />} />
        <Route path="/schedules/edit/:id" element={<ScheduleEdit />} />

        {/* Rutas de reservas */}
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/reservations/add" element={<AddReservation />} />
        <Route path="/reservations/edit/:id" element={<ReservationEdit />} />
      </Routes>
    </Router>
  );
}

export default App;


