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
  console.log(producto);
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
      <form onSubmit={actualizarProducto}>
        <legend>editando</legend>

        <div className="campo">
          <label>Nombre Producto:</label>
          <input onChange={actualizarState} type="text" placeholder="Nombre Producto"
             value={producto.name} name="name"/>
        </div>

        <div className="campo">
          <label>Imagen </label>
          <input onChange={actualizarState} type="text" placeholder="Imagen url"
            value={producto.img} name="img"/>
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input onChange={actualizarState} type="text" placeholder="precio producto"
            value={producto.price}name="price"/>
        </div>

        <div className="enviar">
          <input disabled={validarCliente()} type="submit" class="btn btn-azul"
          value="guardar cambios"/>
        </div>

      </form>
    </>
  )
}
