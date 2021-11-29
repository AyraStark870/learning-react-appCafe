import React, {useState, useEffect, useContext} from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext';
import { BtnAdmin } from './BtnAdmin';
import { BtnCard } from './BtnCard';
import { useNavigate } from "react-router-dom";

const styles ={
    cardita : {
    display: "flex",
    alignItems: 'center',
    justifyContent:'center',
    width: '600px',
    height: '500px',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    padding: '20px',
  },
  divPyD:{
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  }

}

export const VerProducto = ({ aumentarCarrito,carrito, decrementarCarrito,}) => {

  let navigate = useNavigate();

  const [auth, guardarAuth] = useContext(CRMContext);
  const rol = auth.rol


  const params = useParams()
  const id = params.id
  let autenticado = auth.auth
  const [prod, setProd] = useState({})


  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/cafes/${id}`)
    clienteConsulta.data.cafe.price = Number(clienteConsulta.data.cafe.price)
    setProd(clienteConsulta.data.cafe);
  }


  useEffect(() => {

    consultarAPI()
  }, [])

  let item = carrito.filter(x => x.id === prod._id)
  let itemObj = item[0]
  let cantidad;
  itemObj ? cantidad = itemObj.qty : cantidad = 0

  const eliminarCliente = id => {
    console.log(id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un producto eliminado no se puede recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        // eliminar en la rest api
        clienteAxios.delete(`/cafes/${id}`)
          .then(res => {
            if (res.status === 200) {
              Swal.fire(
                'Eliminado',
                res.data.mensaje,
                'success'
              )
              navigate("/cafes", { replace: true });
            }
          })
      }
    })
  }

  return (
    <div>
    <div className='container'>
      <div className='cardita' >
          <img src={prod.img} alt={prod.name}/>

          <div className='divPy'>
            <div style={{padding:'12px', textAlign:'left',maxWidth:'280px'}}>
              <h5 style={{ color:'#007185'}}>{prod.name}</h5>
         <p>{ prod.desc}</p>
            </div>
            <div style={{ width: '100px' }}>
              <p style={{ color: '#FF5403', fontWeight: '600'}}>{`$ ${prod.price}`}</p>
            {
              cantidad === 0 && autenticado===true
                ?
                (
                    <button className='pedirCardBtn'
                    onClick={() => aumentarCarrito(prod)}>pedir</button>
                )
                :
                (
                    <BtnCard style={{ width: '100px' }}
                     aumentarCarrito={aumentarCarrito} cafe={prod} cantidad={cantidad}
                    decrementarCarrito={decrementarCarrito} carrito={carrito} />
                )
            }
            </div>


        </div>
      </div>
    </div>
          {rol ==='ADMIN_ROLE'
          ?

              <BtnAdmin id={id} eliminarCliente={()=>eliminarCliente(id)} prod={prod}/>
         :
              null
         }
    </div>
  )
}
