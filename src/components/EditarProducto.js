import React, { useState, useContext, useEffect} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";

export const EditarProducto = (props) => {
  let navigate = useNavigate()
  const [pagina, setPagina] = useState('Inicio')

 // console.log(auth);

  const params = useParams()
  const id = params.id
  console.log(params);

  const [producto, datosProducto] = useState({
    name:'',
    price:'',
    img:''
  })

  const consultarAPI = async() => {
    const clienteConsulta = await clienteAxios.get(`/cafes/${id}`)
    console.log(clienteConsulta );
    datosProducto(clienteConsulta.data.cafe);
  }
  console.log(producto);


  useEffect(() => {

    consultarAPI()
  }, [])


  const actualizarState =({target})=>{
     datosProducto({
      ...producto,
      [target.name]:target.value
    })
  }

  const validarCliente = () => {
    const {name, img, price} = producto

    let valido = !name.length || !img.length || !price.length

    return valido
  }
  const actualizarProducto = async(e) =>{
    e.preventDefault()
    const nuevoProd = await clienteAxios.put(`/cafes/${producto._id}`, producto)
    Swal.fire(
      'Se edito correctamente',
      'peticion exitosa',
      'success'
    )
    navigate("/cafes");
  }




  return (
    <>
      <form className='container-form' onSubmit={actualizarProducto}>
        <legend>editando</legend>

        <div className="campo-form">
          <label>Nombre Producto:</label>
          <input onChange={actualizarState} type="text" placeholder="Nombre Producto"
             value={producto.name} name="name"/>
        </div>

        <div className="campo-form">
          <label>Imagen </label>
          <input onChange={actualizarState} type="text" placeholder="Imagen url"
            value={producto.img} name="img"/>
        </div>

        <div className="campo-form">
          <label>Precio:</label>
          <input onChange={actualizarState} type="text" placeholder="precio producto"
            value={producto.price}name="price"/>
        </div>

        <div className="">
          <input disabled={validarCliente()} type="submit" class="submit-form"
          value="guardar"/>
        </div>

        <button className='cancelar' onClick={() => { navigate(`/producto/ver/${id}`)}}>
          <i class="fas fa-ban"></i>  cancelar</button>
      </form>

    </>
  )
}
