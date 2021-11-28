import React from 'react'
import { Link } from 'react-router-dom'

const estilos={
  mydiv:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
}

export const BtnAdmin= ({eliminarCliente,prod, id}) => {
  return (
    <div style={estilos.mydiv}>
      {console.log(prod, eliminarCliente)}

        <button onClick={()=>eliminarCliente(id)}><i class='fas fa-trash'></i></button>

      < Link to={`/producto/editar/${id}`}><i class='fas fa-edit'></i></Link>
      < Link to={`/producto/nuevo`}> <i class="fas fa-plus-square"></i></Link>
    </div>
  )
}
