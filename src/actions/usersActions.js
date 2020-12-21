export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const SET_COLOR_REQUEST = 'SET_COLOR_REQUEST';
export const USERS_ERROR = 'USERS_ERROR';

export const getUsersRequest = (id) => {
  console.log(id)
  return {
    type: GET_USERS_REQUEST,
    payload: {
      id
    }
  }
}

export const getUsersSuccess = (items) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: items
  }
}

export const createUserRequest = (username) => {
  return {
    type: CREATE_USER_REQUEST,
    payload: {
      username
    }
  }
}

export const setColorRequest = (
  //username, 
  id, color) => {
  return {
    type: SET_COLOR_REQUEST,
    payload: {
      //username,
      id,
      color
    }
  }
}

export const usersError = (error) => {
  return {
    type: USERS_ERROR,
    payload: error
  }
}