import React, { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import { signUpRequest, logInRequest, getUser } from '../auth'

const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }
const errorColor = { color: 'red' }


const LogInSignUpForm = ({ setUser, toggleSignUpForm }) => {
  const [isLogInForm, setIsLogInForm] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const toggleForm = () => {
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    setPassword('')
    setUsername('')
    setErrorMessage('')
    const toggleFormBool = (isLogInForm) ? false : true
    setIsLogInForm(toggleFormBool)
  }

  const handleAuthRequest = async (event) => {
    event.preventDefault()
    try {
      if (isLogInForm) {
        await logInRequest(username, password)
      } else {
        await signUpRequest(username, password)
      }
      setUser(getUser())
      toggleSignUpForm(false)
    } catch (error) {
      //Display a message for the user
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <form onSubmit={handleAuthRequest}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h1>Fitness Tracker</h1>
            <Avatar style={avatarStyle}><FitnessCenterIcon /></Avatar>
            {isLogInForm ? <h2>Log In</h2> : <h2>Sign Up</h2>}
          </Grid>
          <TextField id="username" label='Username' placeholder='Enter username' onChange={handleUsernameChange} fullWidth required />
          <TextField id="password" label='Password' placeholder='Enter password' type='password' onChange={handlePasswordChange} fullWidth required />
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>{isLogInForm ? 'Log In' : 'Sign Up'}</Button>
          <Typography >{isLogInForm ? 'Need a new account?  ' : 'Already have an account?  '}
            <Link href="#" onClick={toggleForm}>
                {isLogInForm ? "Sign Up" : "Log In"}
            </Link>
          </Typography>
          <Typography style={errorColor}>
            {errorMessage}
          </Typography>
        </Paper>
      </Grid>
    </form>
  )
}

export default LogInSignUpForm