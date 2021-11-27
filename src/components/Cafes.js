import React, { useState, useEffect, useContext }from 'react'
import { useFetch } from '../hooks/useFetch';
import { Card } from './Card';
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const Cafes = ({  aumentarCarrito, decrementarCarrito, carrito}) => {

  let navigate = useNavigate()
  const [auth, guardarAuth] = useContext(CRMContext);
  console.log( 'desde cafes',auth);
  const [cafes, setCafes] = useState([])



  let source = axios.CancelToken.source()
  useEffect(() => {
    if (auth.token !== '') {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const respuesta= await clienteAxios.get('/cafes', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            },
            cancelToken:source.token
          })

              let cafes = respuesta.data.cafes.map(x => {
                return { img: x.img, name: x.name, price: Number(x.price), _id: x._id };
              })
              setCafes(cafes)

        } catch (error) {
          // Error con authorizacion
          if (error.response.status = 500) {
            navigate("/",);
          } else if(axios.isCancel(error)){
            console.log('caught error');
          }
        }
      }


        consultarAPI();

    } else {
      navigate("/",);
    }
  },
   ()=>{
     console.log('desmontar')
    // source.cancel()
    }, [cafes]);




  // Si el state esta como false
  if (!auth.auth) {
    navigate("/",);
  }
/*
  const consultarAPI = async () => {
     await clienteAxios.get(`/cafes`,{
       headers: {
         Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…TEyfQ.Tznnlv9FjLkECs_P9zJH-K63eXm9jRbopw2Me8dGXNM`
       }
     })
      .then(respuesta => {
        let cafes = respuesta.data.cafes.map(x => {
          return { img: x.img, name: x.name, price: Number(x.price), _id: x._id };
        })
        setCafes(cafes)
      }).catch(error=>{
       console.log(error);
        navigate("/", );
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
