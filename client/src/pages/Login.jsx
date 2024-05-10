import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
  // Set initial error values to empty
  setUsernameError('')
  setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === username) {
    setUsernameError('Please enter your username')
    return
  }

//   if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//     setEmailError('Please enter a valid email')
//     return
//   }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  if (password.length < 1) {
    setPasswordError('The password must be 1 characters or longer')
    return
  }

  logIn();

  // Authentication calls will be made here...

    // Check if email has an account associated with it
  checkAccountExists((accountExists) => {
    // If yes, log in
    if (accountExists) logIn()
    // Else, ask user if they want to create a new account and if yes, then log in
    else if (
      window.confirm(
        'An account does not exist with this username: ' + username + '. Do you want to create a new account?',
      )
    ) {
      logIn()
    }
  })
}


// Call the server API to check if the given email ID already exists
const checkAccountExists = (callback) => {
  fetch('http://localhost:5000/check-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((r) => r.json())
    .then((r) => {
      callback(r?.userExists)
    })
}

// Log in a user using email and password
const logIn = () => {
  fetch('http://localhost:5000/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((r) => r.json())
    .then((r) => {
      if ('success' === r.message) {
        localStorage.setItem('user', JSON.stringify({ username, token: r.token }))
        props.setLoggedIn(true)
        props.setUsername(username)
        navigate('/browse')
      } else {
        window.alert('Wrong username or password')
      }
    })
}

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='password'
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login