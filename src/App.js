
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
 import { Cafes } from './components/Cafes';
 import { Pasteles} from './components/Pasteles';
import { Navegacion } from './components/navegacion/Navegacion';
// import { useFetch } from './hooks/useFetch';
import { useCarritoCompras } from './hooks/useCarrito'
import  {CrearProducto}  from './components/CrearProducto';
import  {EditarProducto}  from './components/EditarProducto';
import  {VerProducto}  from './components/VerProducto';
import { Usuario } from './components/Usuario';
import { Login } from './components/Login';
import {CRMContext, CRMProvider} from './context/CRMContext'

function App() {
  const [auth, guardarAuth ] = useContext(CRMContext)



  const { aumentarCarrito,
          decrementarCarrito,
          carrito,
          setearCarrito } = useCarritoCompras()

  return (
    <>
          <CRMProvider value={[auth, guardarAuth]}>


          <Navegacion carrito={carrito} setearCarrito={setearCarrito} />


    <div >
      <Routes>
        <Route path="/cafes" element={< Cafes aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />
        <Route path="/pasteles" element={< Pasteles aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />
          <Route path="/producto/nuevo" element={<CrearProducto />} />
          <Route path="/producto/editar/:id" element={<EditarProducto />} />
          <Route path="/" element={<Usuario/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/producto/ver/:id" element={<VerProducto/>} />
      </Routes>
    </div>
         </CRMProvider>
    </>
  );
}

export default App;
