import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const BtnCard = ({aumentarCarrito,decrementarCarrito,carrito, cantidad, cafe}) => {

  let navigate = useNavigate();
  const [auth, guardarAuth] = useContext(CRMContext);
  let autenticado = auth.auth

  return (

         <div>
           {
             autenticado
             ?
             (
               <div>
                 <button className='pedirCardBtn' onClick={() => aumentarCarrito(cafe)}>+</button>
                 <p style={{ display: 'inline' }}>
                     {cantidad}:pz </p>
                 <button className='pedirCardBtn' onClick={() => decrementarCarrito(cafe)}>-</button>

               </div>

             )
             :
          (
          <button className='pedirCardBtn'
           onClick={() =>{
                            navigate("/login")
             Swal.fire(
               'debe iniciar sesion',
               'para ordenar',
               'warning'
             )
                           }}>ordenar</button>

                           )
           }
         </div>






  )
}
