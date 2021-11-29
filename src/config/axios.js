import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://api-cafe-tamales.herokuapp.com/api'
})

export default clienteAxios;