


import React, {useState} from 'react'

export const useCarritoCompras = () => {

  const [carrito, setCarrito] = useState([])

  const setearCarrito = ()=>{
    setCarrito([])
  }

  const aumentarCarrito=(product)=>{
    console.log(product);
    const { _id:id, name, img, price } = product
    if (carrito.find(p => p.id === id)) {
      const newCarProducts = carrito.map(x => x.id === id
        ? ({ ...x, qty: x.qty + 1, price: (product.price+x.price) })
        : x)
      return setCarrito(newCarProducts)
    }
    return setCarrito(
      [...carrito, { id, name, img, price, qty: 1 }])
    }
    const decrementarCarrito=(product)=>{
      console.log(product);
      const { _id: id} = product
      const prodDisminuirArray = carrito.filter(x => x.id === id)
      const prodDisminuir = prodDisminuirArray[0];

      if(prodDisminuir){
        if (prodDisminuir.qty > 1) {
          const newCarProducts = carrito.map(x => x.id === id
            ? ({ ...x, qty: x.qty - 1, price: (x.price - product.price)  })
            : x)
          return setCarrito(newCarProducts)
        } else if (prodDisminuir.qty === 1) {
          const newCarProducts = carrito.filter(x => x.id !== id)
          return setCarrito(newCarProducts)
        }
      }
    }


  return { aumentarCarrito, decrementarCarrito,carrito, setearCarrito}
}
