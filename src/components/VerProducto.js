import React, {useState, useEffect, useContext} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { CRMContext } from '../context/CRMContext';
import { BtnAdmin } from './BtnAdmin';
import { BtnCard } from './BtnCard';
import { useNavigate } from "react-router-dom";










const styles ={
    cardita : {
    display: "flex",
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    width: '400px',
    height: '500px',
    borderRadius: '8px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    margin: '20px',
    transition: 'all 0.25s'
  }

}

export const VerProducto= (props) => {

  let navigate = useNavigate();

  const [auth, guardarAuth] = useContext(CRMContext);
  const rol = auth.rol


  //obtener el id
   // props.match
  const params = useParams()
  const id = params.id
  console.log(id);
  const [prod, setProd] = useState({})


  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/cafes/${id}`)

    setProd(clienteConsulta.data.cafe);
  }


  useEffect(() => {

    consultarAPI()
  }, [])

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
      <div style={styles.cardita}>
        <div>
         <h3>{prod.name}</h3>
         <p>{`$ ${prod.price}`}</p>
          <img src={prod.img} alt={prod.name}/>
         <p>{ prod.desc}</p>

          {/* <BtnCard  /> */}

        </div>
      </div>
    </div>
          {rol ==='ADMIN_ROLE'
          ?
           <BtnAdmin id={id} eliminarCliente={()=>eliminarCliente(id)} prod={prod}/>
           :
           <button>jeje</button>
         }
    </div>
  )
}
