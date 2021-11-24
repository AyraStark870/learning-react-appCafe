import React from 'react'

const styles = {
  bubbleAlert:{
    backgroundColor:'#B91646',
    borderRadius:'15px',
    color:'#fff',
    padding:'2px 10px',
    width:'25px'
  }
}
export const BubbleAlert = ( {cantidadItems}) => {

  return (
    <span  style={styles.bubbleAlert}>
     {cantidadItems}
    </span>
  )
}
