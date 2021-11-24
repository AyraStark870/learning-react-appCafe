
import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
 import { Cafes } from './components/Cafes';
 import { Pasteles} from './components/Pasteles';
import { Navegacion } from './components/navegacion/Navegacion';
// import { useFetch } from './hooks/useFetch';
import { useCarritoCompras } from './hooks/useCarrito'

function App() {
  const { aumentarCarrito,
          decrementarCarrito,
          carrito,
          setearCarrito } = useCarritoCompras()

  return (
    <>
      <Navegacion carrito={carrito} setearCarrito={setearCarrito}/>
    <div >
      <Routes>
        <Route path="/cafes" element={< Cafes aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />
        <Route path="/pasteles" element={< Pasteles aumentarCarrito={aumentarCarrito}
          decrementarCarrito={decrementarCarrito} carrito={carrito}/>} />

      </Routes>

     {/* <div> {<Cafes aumentarCarrito={aumentarCarrito}
        decrementarCarrito={decrementarCarrito} carrito={carrito}
      />} </div> */}
    </div>
    </>
  );
}

export default App;
