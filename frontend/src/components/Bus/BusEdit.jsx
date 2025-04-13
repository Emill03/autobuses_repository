import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/edit.css";

const BusEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState({
    busNumber: '',
    model: '',
    capacity: '',
    year: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos del autobús al montar el componente
  useEffect(() => {
    fetch(`http://localhost:5000/buses/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el autobús');
        }
        return response.json();
      })
      .then(data => {
        setBus(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBus({
      ...bus,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/buses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bus)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el autobús');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        navigate('/');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleDelete = () => {
    if (!window.confirm('¿Estás seguro que deseas eliminar este autobús?')) return;
    fetch(`http://localhost:5000/buses/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el autobús');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        navigate('/');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  if (loading) return <div>Cargando datos del autobús...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Editar Autobús</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Número de Bus:</label>
          <input
            type="text"
            name="busNumber"
            value={bus.busNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            name="model"
            value={bus.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Capacidad:</label>
          <input
            type="number"
            name="capacity"
            value={bus.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            name="year"
            value={bus.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="status"
            value={bus.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
        Eliminar Autobús
      </button>
    </div>
  );
};

export default BusEdit;
