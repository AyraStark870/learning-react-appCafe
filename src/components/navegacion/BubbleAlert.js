import React from 'react'

const styles = {
  bubbleAlert:{
    backgroundColor:'#0F1111',
    borderRadius:'15px',
    color:'#F3950D',
    //padding:'2px 10px',

    fontWeight:'700'
  }
}
export const BubbleAlert = ( {cantidadItems}) => {

  return (
    <span  style={styles.bubbleAlert}>
     {cantidadItems}
    </span>
  )
}
