import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { Card } from './Card';


export const Pasteles = ({  aumentarCarrito, decrementarCarrito, carrito}) => {

  const { state } = useFetch("https://api-cafe-tamales.herokuapp.com/api/pasteles")
  console.log(state);

  let cafes = []
  if (state.data) {
    cafes = state.data.pasteles.map(x => {
      return { img: x.img, name: x.name, price: Number(x.price), id: x._id };
    })
  }


  return (
    <div >
    {
      state.loading
      ?
        (<div className="alert alert-info text-center">
        Loading...
      </div>)
      :
      (
            <div className='container'>
              {
                cafes.map(x => {
                  return <Card
                    cafe={x}
                    // contador={contador}
                    aumentarCarrito={aumentarCarrito}
                    decrementarCarrito={decrementarCarrito}
                    carrito={carrito}
                  />
                })
              }
       </div>

      )


     }
    </div>
  )
}
