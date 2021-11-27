import React, { useState, useEffect, useContext }from 'react'
import { useFetch } from '../hooks/useFetch';
import { Card } from './Card';
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';

export const Cafes = ({  aumentarCarrito, decrementarCarrito, carrito}) => {

  const [auth, guardarAuth] = useContext(CRMContext);
  console.log( 'desde cafes',auth);
  const [cafes, setCafes] = useState([])

  const consultarAPI = async () => {
     await clienteAxios.get(`/cafes`,{
       headers: {
         Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaTFAZ21haWwuY29tIiwiaWQiOiI2MWExNGM1NTcwZTc4ZTc2NTFiNGRhN2YiLCJyb2wiOiJVU0VSX1JPTEUiLCJpYXQiOjE2Mzc5ODg5MzAsImV4cCI6MTYzODAwMzMzMH0.0jw9z9rUS_V6ONyLGxnYTZdxh4zkMYKaDFe_mCk3DGM`
       }
     })
      .then(respuesta => {
        setCafes(respuesta.data.cafes)
      }).catch(error=>{
       console.log(error);
      })
  }
  useEffect(() => {

    consultarAPI()
  }, [])
console.log(cafes);
  // const { state } = useFetch("https://api-cafe-tamales.herokuapp.com/api/cafes")

  /*
  let cafes = []
  if (state.data) {
    cafes = state.data.cafes.map(x => {
      return { img: x.img, name: x.name, price: Number(x.price), id: x._id };
    })
  }

*/
let state =  {loading: false}
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
