import { useSelector } from "react-redux"

export const DashboardAlumno = () => {

    const {user} = useSelector(state => state.auth);
    const { calificaciones } = useSelector(state => state.calificaciones);

    const data = calificaciones.filter( calificacion => user.name_user === calificacion.name_user);
    
    console.log(data);
  return (
    <div className="container shadow p-3 mb-5 bg-white rounded mt-3">
        <div className="row">
            <h2> Nombre Usuario:  <span>{user.name_user} </span></h2>
            <h2> Matricula:  <span>{user.staff_id} </span></h2>
            <h2> Correo:  <span>{user.email} </span></h2>


            <hr/>
            <label><b>Parcial:</b> <span>{data[0].tipo_evaluacion}</span></label>
            <label><b>Materia:</b> <span>{data[0].materia}</span></label>
            <label><b>Grupo:</b> <span>{data[0].grupo}</span></label>
            <label><b>Calificacion:</b> <span>{data[0].calificacion}/100</span></label>

        </div>
      
    </div>
  )
}

