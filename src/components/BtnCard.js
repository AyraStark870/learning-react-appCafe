import React from 'react'
import { Link } from 'react-router-dom'
import { useCarritoCompras } from '../hooks/useCarrito'

export const BtnCard = ({aumentarCarrito,decrementarCarrito,carrito, cantidad, cafe}) => {


  return (

      <div>

        <button onClick={() => aumentarCarrito(cafe)}>+</button>
        <p style={{ display: 'inline' }}>
          cantidad: {cantidad} </p>
        <button onClick={() => decrementarCarrito(cafe)}>-</button>
      </div>

  )
}
