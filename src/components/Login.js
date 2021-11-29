import React, {useState, useContext} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";

export const Login= (props) => {

  const [auth, guardarAuth] = useContext(CRMContext);

  let navigate = useNavigate();

  const [credenciales, setCredencial] = useState({
    password:'',
    email:''
  })
  const actualizarUser =({target})=>{
    setCredencial({
      ...credenciales,
      [target.name]:target.value
    })

  }

  const logearUsuario  = e => {
    e.preventDefault();

    clienteAxios.post('/autenticar', credenciales)
      .then(respuesta => {
        // extraer el token y colocarlo en localstorage
        const { token } = respuesta.data;
        const { rolenv: rol, nombreenv:name } = respuesta.data;
        console.log(respuesta.data);
        localStorage.setItem('token', token);
        guardarAuth({
          token,
          auth: true,
          rol,
          name
        })

        Swal.fire(
          'login correcto',
          'peticion exitosa',
          'success'
        )
        navigate("/cafes", { replace: true });
        // props.guardarConsulta(true)
        // //redireccionar
        // props.history.push('/')
      })
    }


const validarCliente = () =>{
  const {  email, password} = credenciales

  let valido = !email.length || !password.length

  return valido
}
  return (
    <div  >
      <form className='container-form' onSubmit={logearUsuario}>
        <legend>Sign in</legend>

        <div className="campo-form">
          <label>Email</label>
          <input onChange={actualizarUser} type="email" placeholder="email@email.com"
             name="email"/>
        </div>

        <div className="campo-form">
          <label>Pasword:</label>
          <input onChange={actualizarUser} type="password" placeholder="********"
          name="password"/>
        </div>

        <div className="enviar-form">
          <input disabled={validarCliente()} type="submit" class="submit-form"
          value="Ingresar"/>
        </div>
         <p>Eres nuevo ?</p>

        <div className="enviar-form">
          <input type="submit" class="crear-form"
            value="Crear tu propia cuenta" onClick={() => navigate("/", { replace: true })} />
        </div>
      </form>

    </div>
  )
}
