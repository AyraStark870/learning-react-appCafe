import React, { useState, useEffect, useContext }from 'react'
import { useFetch } from '../hooks/useFetch';
import { Card } from './card/Card';
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const Pasteles = ({  aumentarCarrito, decrementarCarrito, carrito}) => {
  const [search, setSearch] = useState('')

  let y
  const handleChange = ({target}) =>{
    y = target.value;
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    let filtrado = pasteles.filter(x=>x.name.includes(y))
    setPasteles(filtrado);
  }


  let navigate = useNavigate()
  const [auth, guardarAuth] = useContext(CRMContext);
  //console.log( 'desde cafes',auth);
  const [pasteles, setPasteles] = useState([])



  let source = axios.CancelToken.source()

  useEffect(() => {
    if (true) {
      // Query a la API
      const consultarAPI = async () => {
        try {
          const respuesta= await clienteAxios.get('/cafes', {
            // headers: {
            //   Authorization: `Bearer ${auth.token}`
            // },
            cancelToken:source.token
          })
              console.log(respuesta);
          let cafes1 = respuesta.data.cafes.map(x => {
            return { img: x.img, name: x.name, price: Number(x.price), _id: x._id };
          })
          let pastel = cafes1.filter(x => {
            const { name } = x
            console.log(name);
            return name.includes('pastel');
          })
              setPasteles(pastel)

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
    }, [pasteles]);

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
              pasteles.map(x => {
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
