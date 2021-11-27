import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';
import { BtnCard } from './BtnCard';





export const Card = ({ cafe, aumentarCarrito, decrementarCarrito, carrito}) => {

  const [auth, guardarAuth] = useContext(CRMContext);


  let item = carrito.filter(x => x.id === cafe.id)
  let itemObj = item[0]
  let cantidad;
  itemObj ? cantidad = itemObj.qty : cantidad = 0




  return (
    <div className='card'>
      <h2>{cafe.name}</h2>
      <img src={cafe.img} alt={cafe.name} />
       <p>${cafe.price}</p>

       {
         cantidad===0
         ?
         (
            <button onClick={() => aumentarCarrito(cafe)}>pedir</button>
         )
         :
         (
          <BtnCard aumentarCarrito={aumentarCarrito} decrementarCarrito={decrementarCarrito}
          carrito={carrito} cantidad={cantidad} cafe={cafe}/>
         )
        }


       < Link to={`/producto/ver/${cafe._id}`}><button>detalle</button></Link>



    </div>
  )
}
