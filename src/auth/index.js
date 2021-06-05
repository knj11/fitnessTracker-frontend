
import axios from 'axios'

const URL_DOMAIN = `https://fitnesstrac-kr.herokuapp.com`

export const signUpRequest = async (username, password) => {
  try {
    console.log("Request being sent for Sign Up")
    const response = await axios.post(`${URL_DOMAIN}/api/users/register`, {username, password})
    storeCurrentUser(response)
  } catch (error) {
    console.log("Server error when hitting /register")
    console.log(error.response.data)
    throw error.response.data
  }
}

export const logInRequest = async (username, password) => {
  try {
    console.log("Request being sent for Log In")
    const response = await axios.post(`${URL_DOMAIN}/api/users/login`, {username, password})
    storeCurrentUser(response)
  } catch (error) {
    console.log("Server error when hitting /login")
    console.log(error.response.data)
    throw error.response.data
  }
}

export function storeCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user;
}

export function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}