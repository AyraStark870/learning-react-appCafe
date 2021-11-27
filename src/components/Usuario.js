import React, {useState, useContext} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { CRMContext } from '../context/CRMContext';

export const Usuario= () => {

  const [auth, guardarAuth] = useContext(CRMContext);

  console.log(auth);

  const [usuario, setUsuario] = useState({
    name:'',
    password:'',
    email:''
  })
  const actualizarUser =({target})=>{
    setUsuario({
      ...usuario,
      [target.name]:target.value
    })

  }

  const agregarUsuario  = e => {
    e.preventDefault();

    clienteAxios.post('/usuario', usuario)
      .then(respuesta => {
        console.log(respuesta)
        Swal.fire(
          'Su cuenta ha sido creada',
          'peticion exitosa',
          'success'
        )
        const { token } = respuesta.data;
        localStorage.setItem('token', token);
        guardarAuth({
          token,
          auth: true
        })
        console.log(auth);
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
  const { name, email, password} = usuario

  let valido = !name.length || !email.length || !password.length

  return valido
}
  return (
    <>
      <form onSubmit={agregarUsuario}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input onChange={actualizarUser} type="text" placeholder="Nombre Completo"
           name="name"/>
        </div>

        <div className="campo">
          <label>Email</label>
          <input onChange={actualizarUser} type="email" placeholder="email@email.com"
             name="email"/>
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input onChange={actualizarUser} type="password" placeholder="********"
          name="password"/>
        </div>

        <div className="enviar">
          <input disabled={validarCliente()} type="submit" class="btn btn-azul"
          value="Crear Cuenta"/>
        </div>
        <br />
         <div>
          ya tienes cuenta?  < Link to={`/login`}> Sign in</Link>
         </div>

      </form>
    </>
  )
}
