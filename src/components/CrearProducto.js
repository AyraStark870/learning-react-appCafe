import React, {useState} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export const CrearProducto = () => {
  let navigate = useNavigate()
  const [producto, setProducto] = useState({
    name:'',
    price:'',
    img:''
  })
  const actualizarState =({target})=>{
    setProducto({
      ...producto,
      [target.name]:target.value
    })
  }
  console.log(producto);
  const validarCliente = () => {
    const {name, img, price} = producto

    let valido = !name.length || !img.length || !price.length

    return valido
  }
  const agregarProducto = e =>{
     e.preventDefault();

    clienteAxios.post('/cafes', producto)
      .then(respuesta => {
        console.log(respuesta)
        Swal.fire(
          'Se agrego el Producto',
          'peticion exitosa',
          'success'
        )
        document.querySelector('.container-form').reset()
      })
  }


  return (
    <>
      <form className='container-form' onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo-form">
          <label>Nombre Producto:</label>
          <input onChange={actualizarState} type="text" placeholder="Nombre Producto" name="name"/>
        </div>

        <div className="campo-form">
          <label>Imagen </label>
          <input onChange={actualizarState} type="text" placeholder="Imagen url" name="img"/>
        </div>

        <div className="campo-form">
          <label>Precio:</label>
          <input onChange={actualizarState} type="text" placeholder="precio producto" name="price"/>
        </div>

        <div >
          <input disabled={validarCliente()} type="submit" className="submit-form" value="Agregar"/>
        </div>
        <button className='cancelar' onClick={() => { navigate(`/`) }}>
          cancelar</button>

      </form>
    </>
  )
}
