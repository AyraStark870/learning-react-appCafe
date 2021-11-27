import React from 'react'
import { Link } from 'react-router-dom'

export const BtnAdmin= ({eliminarCliente,prod}) => {
  return (
    <div>
      {console.log(prod, eliminarCliente)}
     jejeje
       <button Link onClick={eliminarCliente}><i class='fas fa-trash'></i></button>
      < Link to={`/producto/editar/${prod.id}`}><i class='fas fa-edit'></i></Link>
      < Link to={`/producto/nuevo`}> <i class="fas fa-plus-square"></i></Link>
    </div>
  )
}
