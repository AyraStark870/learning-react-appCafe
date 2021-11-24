import React from 'react'

const styles= {
   detallesCarro:{
     backgroundColor:'#fff',
     position:'absolute',
     marginTop:'35',
     boxShadow:'1px 5px 5px rgb(0,0,0,0.3)',
     borderRadius:'5px',
     width:'180px',
     right: '70px',
     top:'190px'
   },
   img:{
     width: '40px',
     height: '30px'
   },
   ul:{
     margin:0,
     padding:0
   },
   producto:{
     listStyleType:'none',
     display:'flex',
     justifyContent:'space-between',
     alignItems:'center',
     padding:'25px 20px',
     borderBottom:'solid 1px #aaa'

   }
}

export const DetallesCarro = ({carrito}) => {

  console.log(carrito);
  return (
    <div style={styles.detallesCarro}>
      <ul style={styles.ul}>
        {carrito.map(x=>
          <li style={styles.producto} key={x.id}>
             <img src={x.img} alt={x.name} style={styles.img} />
             {x.name} <span>{x.qty}</span>
           </li>
        )}
      </ul>
    </div>
  )
}
