import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Header, LogInSignUpForm, NavBar } from './components'
import { getUser } from './auth'

const App = () => {
  //call getUser to check if its in local storage
  const [user, setUser] = useState(getUser())
  const [isSignUpFormOpen, toggleSignUpForm] = useState(false)

  return (
    <div id="app">
      {isSignUpFormOpen 
        ? <LogInSignUpForm setUser={setUser} toggleSignUpForm={toggleSignUpForm} />
        : <NavBar user={user} toggleSignUpForm={toggleSignUpForm} />
      }
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);