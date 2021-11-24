import React from 'react'



export const Card = ({ cafe, aumentarCarrito, decrementarCarrito, carrito}) => {

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
           <div>
              <button onClick={() => aumentarCarrito(cafe)}>+</button>
              <p style={{display:'inline'}}>
                cantidad: {cantidad} </p>
              <button onClick={() => decrementarCarrito(cafe)}>-</button>
           </div>
         )
       }


    </div>
  )
}
