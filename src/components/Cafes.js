import React, { useState, useEffect, useContext }from 'react'
import { Card } from './card/Card';
import clienteAxios from '../config/axios'
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const Cafes = ({  aumentarCarrito, decrementarCarrito, carrito}) => {

  let navigate = useNavigate()
  const [auth, guardarAuth] = useContext(CRMContext);
  const [cafes, setCafes] = useState([])
  const [cafeses, setCafeses] = useState([])
  const [form, setForm] = useState('')
  const [loading, setLoading] = useState(true)

  const handleChange = ({ target }) => {
     filtrar(target.value);
  }
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = cafeses.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCafes(resultadosBusqueda);
  }

  let source = axios.CancelToken.source()

  useEffect(() => {
    if (true) {
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
              setCafeses(cafes)
              setLoading(false)

        } catch (error) {
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







  return (
    <div >
    {
      loading
      ?
        (<div className="alert alert-info text-center">
           Loading...
        </div>)
      :
      (
        <>
          <div className='busqueda'>
              <form >
                <input type="text" onChange={handleChange} />
              </form>
          </div>
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
