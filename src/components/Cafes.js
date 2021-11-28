import React, { useState, useEffect, useContext }from 'react'
import { useFetch } from '../hooks/useFetch';
import { Card } from './card/Card';
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const Cafes = ({  aumentarCarrito, decrementarCarrito, carrito}) => {

  let navigate = useNavigate()
  const [auth, guardarAuth] = useContext(CRMContext);
  const [cafes, setCafes] = useState([])
  const [form, setForm] = useState('')


  const handleChange = ({ target }) => {
    // y = target.value;
    // let filtrado = cafes.filter(x => x.name.includes(y))
    setForm(target.value);
    let filtrado = cafes.filter(x => x.name.includes(form))
    setCafes(filtrado);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

     let filtrado = cafes.filter(x => x.name.includes(form))
    setCafes(filtrado);
  }



  let source = axios.CancelToken.source()

  useEffect(() => {
    if (true) {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const respuesta= await clienteAxios.get('/cafes', {
             headers: {
               Authorization: `Bearer ${auth.token}`
             },
            cancelToken:source.token
          })

              let cafes1 = respuesta.data.cafes.map(x => {
                return { img: x.img, name: x.name, price: Number(x.price), _id: x._id };
              })
              let cafes = cafes1.filter(x=>{
                const {name} = x
                return  name.includes('cafe');
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
        <>
          <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
    </form>
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
            </>
      )


     }
    </div>
  )
}
