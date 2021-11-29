import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import { CRMContext } from '../../context/CRMContext'
import { BtnCard } from './BtnCard';





export const Card = ({ cafe, aumentarCarrito, decrementarCarrito, carrito}) => {

  const [auth, guardarAuth] = useContext(CRMContext);


  let item = carrito.filter(x => x.id === cafe._id)

  let itemObj = item[0]
  let cantidad;
  itemObj ? cantidad = itemObj.qty : cantidad = 0




  return (
    < Link style={{textDecoration:'none'}} to={`/producto/ver/${cafe._id}`}>
    <div className='card'>
      <img src={cafe.img} alt={cafe.name} />
       <h3>{cafe.name}</h3>

       <p>${cafe.price}</p>


    </div>
      </Link>



  )
}
