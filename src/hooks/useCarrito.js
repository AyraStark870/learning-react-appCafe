


import React, {useState} from 'react'

export const useCarritoCompras = () => {

  const [carrito, setCarrito] = useState([])

  const setearCarrito = ()=>{
    setCarrito([])
  }

  const aumentarCarrito=(product)=>{
    const { id, name, img, price } = product
    if (carrito.find(p => p.id === product.id)) {
      const newCarProducts = carrito.map(x => x.id === product.id
        ? ({ ...x, qty: x.qty + 1, price: (product.price+x.price) })
        : x)
      return setCarrito(newCarProducts)
    }
    return setCarrito(
      [...carrito, { id, name, img, price, qty: 1 }])
    }
    const decrementarCarrito=(product)=>{
      const prodDisminuirArray = carrito.filter(x => x.id === product.id)
      const prodDisminuir = prodDisminuirArray[0];

      if(prodDisminuir){
        if (prodDisminuir.qty > 1) {
          const newCarProducts = carrito.map(x => x.id === product.id
            ? ({ ...x, qty: x.qty - 1, price: (x.price - product.price)  })
            : x)
          return setCarrito(newCarProducts)
        } else if (prodDisminuir.qty === 1) {
          const newCarProducts = carrito.filter(x => x.id !== product.id)
          return setCarrito(newCarProducts)
        }
      }
    }



  return { aumentarCarrito, decrementarCarrito,carrito, setearCarrito}
}
