import React, { useState } from 'react';
import { useCarritoCompras } from '../hooks/useCarrito'

const CRMContext = React.createContext([ {}, () => {} ]);


// const { aumentarCarrito,
//     decrementarCarrito,
//     carrito,
//     setearCarrito } = useCarritoCompras()

const CRMProvider = props => {

    // definir el state inicial
    const [auth, guardarAuth ] = useState({
        token: '',
        auth: false,
        rol: '',
    });

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    );
}

export { CRMContext, CRMProvider };