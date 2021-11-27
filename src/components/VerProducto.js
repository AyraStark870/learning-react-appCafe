import React, {useState, useEffect, useContext} from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { CRMContext } from '../context/CRMContext';
import { BtnAdmin } from './BtnAdmin';
import { BtnCard } from './BtnCard';








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

  const eliminarCliente = async (unid) => {
    console.log(unid);
    await clienteAxios.delete(`/cafes/${unid}`)
  }

  return (
    <div className='container'>
      <div style={styles.cardita}>
        <div>
         <h3>{prod.name}</h3>
         <p>{`$ ${prod.price}`}</p>
          <img src={prod.img} alt={prod.name}/>
         <p>{ prod.desc}</p>

          {/* <BtnCard  /> */}

          {rol ==='ADMIN_ROLE'
          ?
           <BtnAdmin eliminarCliente={()=>eliminarCliente(id)} prod={prod}/>
           :
           <button>jeje</button>
         }
        </div>
      </div>
    </div>
  )
}
