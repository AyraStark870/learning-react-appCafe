import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";

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
                 <button onClick={() => aumentarCarrito(cafe)}>+</button>
                 <p style={{ display: 'inline' }}>
                    cantidad: {cantidad} </p>
                 <button onClick={() => decrementarCarrito(cafe)}>-</button>

               </div>

             )
             :
          (<button onClick={() => navigate("/", { replace: true })}>pedir</button>)
           }
         </div>






  )
}
