import React from 'react'
import { Link } from 'react-router-dom'

const estilos={
  mydiv:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'40px',
    borderBottom: '0.9px solid #E8E1D9'
  }
}

export const BtnAdmin= ({eliminarCliente,prod, id}) => {
  return (
    <div style={estilos.mydiv}>


        <button className='admon' onClick={()=>eliminarCliente(id)}><i class='fas fa-trash'></i></button>

      < Link className='admon' to={`/producto/editar/${id}`}><i class='fas fa-edit'></i></Link>
      < Link className='admon' to={`/producto/nuevo`}> <i class="fas fa-plus-square"></i></Link>
    </div>
  )
}
