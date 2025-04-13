import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/edit.css";

const RouteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState({
    routeName: '',
    origin: '',
    destination: '',
    distance: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos de la ruta al montar el componente
  useEffect(() => {
    fetch(`http://localhost:5000/routes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener la ruta');
        }
        return response.json();
      })
      .then(data => {
        setRoute(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({
      ...route,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Aseguramos que la distancia se envíe como número
    const routePayload = {
      ...route,
      distance: parseFloat(route.distance)
    };

    fetch(`http://localhost:5000/routes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(routePayload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar la ruta');
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
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta ruta?')) return;
    fetch(`http://localhost:5000/routes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar la ruta');
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

  if (loading) return <div>Cargando datos de la ruta...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Editar Ruta</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nombre de la Ruta:</label>
          <input
            type="text"
            name="routeName"
            value={route.routeName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Origen:</label>
          <input
            type="text"
            name="origin"
            value={route.origin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destino:</label>
          <input
            type="text"
            name="destination"
            value={route.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Distancia:</label>
          <input
            type="number"
            step="0.01"
            name="distance"
            value={route.distance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      <button 
        onClick={handleDelete} 
        style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
      >
        Eliminar Ruta
      </button>
    </div>
  );
};

export default RouteEdit;