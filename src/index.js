import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Header, LogInSignUpForm, Tabs } from './components'

//toggle Login
const isUserLoggedInDuringStartUp = false

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserLoggedInDuringStartUp)

  return (
    <div id="app">
      {isUserLoggedIn
        ? <Tabs />
        : <LogInSignUpForm setIsUserLoggedIn={setIsUserLoggedIn} />
      }
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);