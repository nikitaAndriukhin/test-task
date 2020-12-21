import axios from 'axios';

export const getUsers = ({id}) => {
  return axios.get(`/users?id=${id}`, {
  })
}

export const createUser = ({username}) => {
  return axios.post('/users', {"username":`${username}`, "color":""})
}

export const setColor = ({username, id, color}) => {
  return axios.put(`/users?id=${id}`, {"username":`${username}`, "color": `${color}`})
}

