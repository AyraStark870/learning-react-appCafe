import React, {useState, useContext} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { CRMContext } from '../context/CRMContext';

export const Login= (props) => {

  const [auth, guardarAuth] = useContext(CRMContext);


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
        const { rolenv:rol } = respuesta.data;
        console.log(token);
        localStorage.setItem('token', token);
        guardarAuth({
          token,
          auth: true,
          rol
        })

        Swal.fire(
          'login correcto',
          'peticion exitosa',
          'success'
        )

        // props.guardarConsulta(true)
        // //redireccionar
        // props.history.push('/')
      })
    }
  /*
  console.log(producto);
  const validarCliente = () => {
    const {name, img, price} = producto

    let valido = !name.length || !img.length || !price.length

    return valido
  }
  const agregarProducto = e =>{
     e.preventDefault();

    clienteAxios.post('/usuario', producto)
      .then(respuesta => {
        console.log(respuesta)
        Swal.fire(
          'Se agrego el Producto',
          'peticion exitosa',
          'success'
        )

        // props.guardarConsulta(true)
        // //redireccionar
        // props.history.push('/')
      })
  }

*/



const validarCliente = () =>{
  const {  email, password} = credenciales

  let valido = !email.length || !password.length

  return valido
}
  return (
    <>
      <form onSubmit={logearUsuario}>
        <legend>Login</legend>

        <div className="campo">
          <label>Email</label>
          <input onChange={actualizarUser} type="email" placeholder="email@email.com"
             name="email"/>
        </div>

        <div className="campo">
          <label>Pasword:</label>
          <input onChange={actualizarUser} type="password" placeholder="********"
          name="password"/>
        </div>

        <div className="enviar">
          <input disabled={validarCliente()} type="submit" class="btn btn-azul"
          value="Ingresar"/>
        </div>

      </form>
    </>
  )
}
