
import {Link, NavLink } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { Carrito } from "./Carrito";
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from "react-router-dom";
var classNames = require('classnames');

const styles={
  menu:{
      display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
   color: 'chartreuse',
   border: '4px solid red',

   }
}

export const NavNueva = ({ carrito, setearCarrito}) => {
   let navigate = useNavigate();


  const [auth, guardarAuth] = useContext(CRMContext);
  let nombreUser = auth.name


  const cerrarSesion = () => {
    // auth.auth = false y el token se remueve
    setearCarrito()
    guardarAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '');

    navigate("/", { replace: true })
  }


 const [showing, setShow] = useState(true)
console.log(showing);

  return (
    <div>
      <header>

        <nav
          className={showing ? classNames({menu:true, show:true}) : 'menu'}>

          <NavLink className='NavLink'  onClick={() => setShow(!showing)}
            exact to="/">Inicio</NavLink>
          <NavLink className='NavLink' onClick={() => setShow(!showing)}
            exact to="/cafes">Cafes</NavLink>
          <NavLink className='NavLink' onClick={() => setShow(!showing)}
            exact to="/pasteles">Pasteles</NavLink>

        </nav>
        <div className='segunda'>

          <div className='name' >
             {`hello! ${nombreUser?nombreUser:''}`}
          </div>
          <div>

            <Carrito className='divCarrito' carrito={carrito} setearCarrito={setearCarrito} />

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
                onClick={() => navigate("/login", { replace: true })}
            >
                <i class="fa fa-lock-open"></i>
              Iniciar Sesión
            </button>
          )}
          <span className='btn-menu'>
             <button  onClick={() => setShow(!showing)}

             > <i  className='fa fa-bars'></i></button>

          </span>

          </div>

      </header>
    </div>
  )
}
