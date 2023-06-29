import { Form, Formik } from "formik"
import { MyTextInput } from "../formik/MyTextInput";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useAuthStore } from "../../hooks/useAuthStore";

export const RegisterScreen = () => {
const {startRegister}=useAuthStore(

);
 const handlesumbit = (dataUser) => {
  startRegister(dataUser);
 }

  return (
    <>
    <div className="login-container">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ backgroundImage: "url('https://posgrados.tesi.org.mx/img/bg-img/gallery6.jpg')" }}></div>
                <div className="col-lg-6" >
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">BIENVENIDO</h1>
                    </div>
                    <Formik
                     initialValues={{
                          name_user: '',
                          pass: '',
                          email: '',
                          staff_id: ''
                      }}
                      onSubmit={handlesumbit}
                      validationSchema={
                          Yup.object({
                              name_user: Yup.string()
                                              .max(15, 'Debe de tener 15 caracteres o menos')
                                              .required('Requerido'),
                              pass: Yup.string()
                                              .min(3, 'Debe de tener 3 caracteres o mas')
                                              .max(15, 'Debe de tener 15 caracteres o menos')
                                              .required('Requerido'),
                              email: Yup.string()
                                              .email('Email no tiene un formato valido')
                                              .required('Requerido'),
                              staff_id: Yup.string()
                                              .max( 10,'Email no tiene un formato valido')
                                              .required('Requerido'),
                        
                          }) 
                      } 
                    >
                      { () => (
                        
                        <Form  noValidate autoComplete="off">
                          <div className="row ">
                            <div className="col">

                              <MyTextInput 
                                  label="Nombre de usuario" 
                                  name="name_user" 
                                  placeholder="Ejemplo: Carlos Daniel"
                                  type="text"
                                  
                              />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col">
                              <MyTextInput 
                                  label="Ingresa tu Contraseña" 
                                  name="pass" 
                                  type="password"
                                  placeholder="password"
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                            <MyTextInput 
                                label="Ingresa tu correo" 
                                name="email" 
                                placeholder="example@correo.com"
                                type="email"
                            />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                            <MyTextInput 
                                label="Ingresa tu matricula" 
                                name="staff_id" 
                                placeholder="Matricula"
                                type="text"
                            />
                            </div>
                          </div>
                            
                            <button className="btn btn-outline-success" variant="contained" type="submit">Submit</button>
                        </Form>
                    )
                }

                    </Formik>
                 
                    <div className="btn btn-container text-center mt-3">
                    <Link className="small text-success" to="/auth/login" >Si ya tienes cuenta inicia sesion</Link> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
