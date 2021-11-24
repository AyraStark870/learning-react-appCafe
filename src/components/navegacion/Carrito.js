
import React, { useState } from 'react'
import { BubbleAlert } from './BubbleAlert'
import { DetallesCarro } from './DetallesCarro'

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carro: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#105652',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '20px'
  },
  bubble: {
    position: 'relative',
    left: 69,
    top: 58
  },

}
export const Carrito = ({carrito, setearCarrito}) => {

  const [carroVisible, setcarroVisible] = useState(false)


  const cantidadItems = carrito.reduce((accum, x) => accum + x.qty, 0)
  const cantidadmoney = carrito.reduce((accum, x) => accum + x.price, 0)

  const mostrarCarrito = () => {
    if (!carrito.length) return
    setcarroVisible(!carroVisible)
  }


  return (

    <div style={styles.tieso}>
      {cantidadItems > 0 &&
        <span style={styles.bubble}>
          <BubbleAlert cantidadItems={cantidadItems} />
        </span>}
      <div style={styles.div} >


        <div style={{...styles.carro, padding:'8px 13px'}}>
          <i class="fas fa-dollar-sign"></i> {` ${cantidadmoney}`}
          </div>

        <button onClick={mostrarCarrito} style={styles.carro}>
          <i class="fas fa-shopping-cart"></i>
        </button>
        {carroVisible && <DetallesCarro carrito={carrito} />}

        <button style={styles.carro} onClick={setearCarrito}><i class="fas fa-trash"> </i></button>
      </div>
    </div>

  )
}
