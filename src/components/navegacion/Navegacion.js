
import {Link, NavLink } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { Carrito } from "./Carrito";
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from "react-router-dom";

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    padding: '0 50px ',
    boxShadow: '0 2px 10px rgb(0,0,0,0.7)',
    position: 'sticky',
    top:'0px',
    backgroundColor: '#0F1111',
    zIndex: '1'
  },
  navbar: {
    //backgroundColor:'#3F3351',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '1000px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight:'700'
  },
  active: {
    color: '#FFCA03',
    fontSize: '24px',
    textDecoration: 'none',
        fontWeight: '700',
    textDecoration: 'underline',
  },
  name:{
    color:'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'2px'
  },
  divCarrito: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 0

    // marginRight: '115px',
    // marginTop: '25px',
  }
}

export const Navegacion = ({ carrito, setearCarrito}) => {
  let navigate = useNavigate();


  const [auth, guardarAuth] = useContext(CRMContext);
  let nombreUser = auth.name


  const cerrarSesion = () => {
    // auth.auth = false y el token se remueve
    guardarAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '');

    navigate("/", { replace: true })
  }



  return (
    <>

     <div>
      <div style={styles.div}>

        <nav style={styles.navbar}>

          <NavLink className='NavLink'
            exact to="/cafes">Cafes</NavLink>
          <NavLink className='NavLink'
            exact to="/pasteles">Pasteles</NavLink>

        </nav>
          <div style={styles.name}>
             {`hello! ${nombreUser?nombreUser:''}`}
          </div>
          <div style={styles.divCarrito}>

            <Carrito carrito={carrito} setearCarrito={setearCarrito} />

          </div>
          {auth.auth ? (
            <button
              type="button"
              className="btn-rojo"
              onClick={cerrarSesion}
            >
              <i className="far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : (
            <button
              type="button"
              className="btn-rojo"
                onClick={() => navigate("/", { replace: true })}
            >

              Iniciar Sesión
            </button>
          )}

      </div>
      </div>

    </>

  )
}
