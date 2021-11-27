
import {Link } from "react-router-dom";
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
    display: 'flex',
    alignItems: 'center',
    height: '80px',
    flexDirection: 'row',
    padding: '0 50px ',
    boxShadow: '0 2px 10px rgb(0,0,0,0.7)',
    position: 'sticky',
    top:'0px',
    backgroundColor: 'rgb(0,0,0,0.3)',
    zIndex: '1'
  },
  navbar: {
    //backgroundColor:'#3F3351',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '1800px'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight:'700'
  },
  linkAct: {
    color: '#FFCA03',
    fontSize: '24px',
    textDecoration: 'none',
        fontWeight: '700',
    textDecoration: 'underline',
  },
  divCarrito: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '115px',
    // marginTop: '25px',
  }
}

export const Navegacion = ({ carrito, setearCarrito}) => {
  let navigate = useNavigate();

  const [pagina, setPagina] = useState('Inicio')

  const [auth, guardarAuth] = useContext(CRMContext);

  const cerrarSesion = () => {
    // auth.auth = false y el token se remueve
    guardarAuth({
      token: '',
      auth: false
    });

    localStorage.setItem('token', '');

    navigate("/", { replace: true })
  }

  const cambiarPag = (e) => {
    setPagina(e.target.name)
  }

  return (
    <>

     <div>
      <div style={styles.div}>

        <nav style={styles.navbar}>
          {/* <Link style={pagina !== 'Inicio' ? styles.link : styles.linkAct}
            name='Inicio' onClick={cambiarPag} to="/">Inicio</Link> */}
          {/* <Link style={pagina !== 'Usuario' ? styles.link : styles.linkAct}
            name='Usuario' onClick={cambiarPag} to="/">Ingresar</Link> */}
          <Link style={pagina === 'Cafes' ? styles.linkAct : styles.link}
            name='Cafes' onClick={cambiarPag} to="/cafes">Cafes</Link>
          <Link style={pagina === 'Pasteles' ? styles.linkAct : styles.link}
            name='Pasteles' onClick={cambiarPag} to="/pasteles">Pasteles</Link>

        </nav>
          {auth.auth ? (
            <button
              type="button"
              className="btn btn-rojo"
              onClick={cerrarSesion}
            >
              <i className="far fa-times-circle"></i>
              Cerrar Sesión
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-rojo"
                onClick={() => navigate("/", { replace: true })}
            >

              Iniciar Sesión
            </button>
          )}

      </div>
      <div style={styles.divCarrito}>

        <Carrito carrito={carrito} setearCarrito={setearCarrito} />

       </div>
      </div>

    </>

  )
}
