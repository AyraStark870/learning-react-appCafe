
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
 import { Cafes } from './components/Cafes';
 import { Pasteles} from './components/Pasteles';
 import { Inicio} from './components/Inicio';

// import { useFetch } from './hooks/useFetch';
 import { useCarritoCompras } from './hooks/useCarrito'
import  {CrearProducto}  from './components/CrearProducto';
import  {EditarProducto}  from './components/EditarProducto';
import  {VerProducto}  from './components/card/VerProducto';
import { Usuario } from './components/Usuario';
import { Login } from './components/Login';
import {CRMContext, CRMProvider} from './context/CRMContext'
import { NavNueva } from "./components/navegacion/NavNueva";

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '100 %',
   // maxWidth: '1600px',
    height: 'auto',
    margin:'auto',
  },
}
function App() {
  const [auth, guardarAuth] = useContext(CRMContext)



  const { aumentarCarrito,
          decrementarCarrito,
          carrito,
          setearCarrito } = useCarritoCompras()

let consulta;

  return (
    <>
          <CRMProvider value={[auth, guardarAuth]}>


          {/* <Navegacion carrito={carrito} setearCarrito={setearCarrito} /> */}
          <NavNueva carrito={carrito} setearCarrito={setearCarrito} />


    <div style={styles.div}>
      <Routes>
        <Route path="/cafes" element={< Cafes aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />
        <Route path="/pasteles" element={< Pasteles aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />
          <Route path="/producto/nuevo" element={<CrearProducto />} />
          <Route path="/producto/editar/:id" element={<EditarProducto />} />
          <Route path="/crear-cuenta" element={<Usuario/>} />
          <Route path="/" element={<Inicio/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/producto/ver/:id" element={<VerProducto
              aumentarCarrito={aumentarCarrito}
              decrementarCarrito={decrementarCarrito} carrito={carrito}/> }

          />
      </Routes>
    </div>
         </CRMProvider>
    </>
  );
}

export default App;
