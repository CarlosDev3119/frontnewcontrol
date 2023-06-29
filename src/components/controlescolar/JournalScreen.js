import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFiltro } from '../../store/calificaciones/filtros';
import { onFiltrando } from '../../store/calificaciones/calificacionesSlice';
import { useAuthStore } from '../../hooks/useAuthStore';
import { DashboardAlumno } from '../dashboard/DashboardAlumno';
import { onLogout } from '../../store/auth';

import DataTable from 'react-data-table-component';



const columns = [
  {
    name: 'Calificaciones',
    selector: "calificacion",
    sortable: true,
  },
  {
    name: 'Grupo',
    selector: 'grupo',
    sortable: true,
  },
  {
    name: 'Materia',
    selector: 'materia',
    sortable: true,
  },
  {
    name: 'Evaluacion',
    selector: 'tipo_evaluacion',
    sortable: true,
  },
  {
    name: 'Alumno',
    selector: 'name_user',
    sortable: true,
  },
  {
    name: 'Semestre',
    selector: 'semestre',
    sortable: true,
  },
];


export const JournalScreen = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const { loadCalificaciones } = useAuthStore();
  
  const { calificaciones, calFiltradas } = useSelector( state => state.calificaciones );
  const { user } = useSelector( state => state.auth );
  const [filteredData, setFilteredData] = useState(calificaciones);
  
  const { filtros } = useSelector( state => state.filtros );
  
  const dispatch = useDispatch();

  console.log(filteredData);
  
  useEffect(() => {
    loadCalificaciones();
  },[]);
  
  console.log(calificaciones);
  const aplicarFiltros = (filtros) => {
    const filtradas = calificaciones.filter((calificacion) => {
      // Verificar si cada filtro está presente en los datos de calificación
      return (
        filtros.includes(calificacion.tipo_evaluacion) 

      );
    });

    return filtradas;
  };
  
  const handleSelectChange = (event) => {
    const datosFiltrar = [];
    setSelectedOption(event.target.value);
    const newfiltros = {...filtros};
    newfiltros.evaluacion = event.target.value;

    dispatch( setFiltro( newfiltros));
    Object.keys(newfiltros).forEach( value => {
      datosFiltrar.push(newfiltros[value]);
    })
    const califFiltradas = aplicarFiltros(datosFiltrar);
    // filtrarCalificaciones(datosFiltrar, calificaciones)
    dispatch( onFiltrando( califFiltradas ) );

  };

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredResult = calificaciones.filter(
      (item) =>
        item.calificacion.toString().toLowerCase().includes(keyword) ||
        item.grupo.toLowerCase().includes(keyword) ||
        item.materia.toLowerCase().includes(keyword) ||
        item.tipo_evaluacion.toLowerCase().includes(keyword) ||
        item.name_user.toLowerCase().includes(keyword) ||
        item.semestre.toString().toLowerCase().includes(keyword)
    );
    setFilteredData(filteredResult);
  };

  const totalAlumnosApobados = ( calificaciones ) => {
    const total = calificaciones.filter( califFiltradas => califFiltradas.calificacion !== 'NA');
    return total.length;

  }

  const calcularIndice = ( calificaciones ) => {
    const total = calificaciones.filter( califFiltradas => califFiltradas.calificacion === 'NA');
    const totalReprobados = total.length / calificaciones.length;
    return (totalReprobados * 100).toFixed(2);

  }

  const handleLogout = () => {
    localStorage.clear();
    return dispatch( onLogout() );
  }

  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
      <a className="navbar-brand" href="#">Control Escolar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
          </li>
        </ul>
      </div>
        <button onClick={ handleLogout } className="btn btn-danger" style={{ float: 'right', marginLeft: '10px' }}>Logout</button>
    </nav>

    <div className="container shadow p-3 mb-5 bg-white rounded mt-3">
      <h1>Índice de Reprobación</h1>
      <h3>Tipo_usuario: {user.user_type}</h3>
      <input type="text" placeholder="Buscar..." onChange={handleFilter} />
      </div>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
        />

    {
      
      <div className="container">
        <div className="card shadow p-4 mx-auto" style={{ width: '400px', margin: '20px' }}>
          <h5 className="card-title text-center">Índice Calculado</h5>
          <div className="card-text">
            <label>Total Alumnos:</label>
            <span>{(filteredData.length > 0) ? filteredData.length : calificaciones.length}</span>
          </div>
          <div className="card-text">
            <label>Total Alumnos Aprobados:</label>
            <span>{(filteredData.length > 0) ? totalAlumnosApobados(filteredData) :totalAlumnosApobados(calificaciones)}</span>
          </div>
          <div className="card-text">
            <label>% de reprobacion: </label>
            <span> {(filteredData.length > 0) ? calcularIndice(filteredData) :calcularIndice(calificaciones)}</span>
          </div>
        
        </div>
      </div>
        
      
    }

    {
        (user.user_type === 'alumno') && (

          <DashboardAlumno />
        )
    }


</>
  )
}
