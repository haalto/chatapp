import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Chatboard from '../Chatboard/Chatboard'
import Login from '../Login/Login'
import Sign from '../Sign/Sign'
import io from 'socket.io-client'
import userServices from '../../services/userServices'
import loginServices from '../../services/loginServices'

const App = () => {   

  //User state
  const [ user, setUser ] = useState('')
  const [ token, setToken ] = useState('')  
  //Login state
  const [ loginUsername, setLoginUsername] = useState('')
  const [ loginPassword, setLoginPassword] = useState('')

  //Sign up state
  const [ signUsername, setSignUsername] = useState('')
  const [ signPassword, setSignPassword] = useState('')

  //New message
  const [ message, setMessage ] = useState('')

  //Other clients and messages
  const [messages, setMessages] = useState([''])
  const [ activeUsers, setActiveUsers] = useState([''])

  //View state
  const [ showLogin, setShowLogin] = useState(true)
  const [ showSign, setShowSign ] = useState(false)
  const [ showChat, setShowChat ] = useState(false)

  const { current: socket } = useRef(io('/', {
    autoConnect: false  
  }))

  //Effects*****************************************

  //If user logged in succesfully connect socket to server
  useEffect(() => {
    
    if (token) {
      socket.io.opts.query = { token }   
      socket.open()     
      setShowLogin(false)
      setShowChat(true)    
    }
  }, [token, socket])
  
  useEffect(() => {    

    //receive messages
    socket.on('chat-message', message => {
      console.log(`Received message: ${message.message} from ${message.user}`)
      setMessages(messages => messages.concat(message))
    })
    
    socket.on('active-users', userData => {
      console.log('Active users', userData)
      setActiveUsers(userData)
    })

  }, [socket]) 

  //Handlers************************************* 

  //Login handlers
  const handleLoginUsernameChange = (event) => {
    setLoginUsername(event.target.value)
  }

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value)
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const user = {
      username: loginUsername,
      password: loginPassword
    }

    loginServices.login(user)
      .then(res => {
        setLoginUsername('')
        setLoginPassword('')
        setUser(res.username)
        setToken(res.token)  
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Sign up handlers
  const handleSignUsernameChange = (event) => {
    setSignUsername(event.target.value)
  }

  const handleSignPasswordChange = (event) => {
    setSignPassword(event.target.value)
  }

  const handleSignSubmit = (event) => {
    event.preventDefault()

    const user = {
      username: signUsername,
      password: signPassword
    }

    userServices.create(user)
      .then(returnedUser => {
        return loginServices.login(user) // if user was created succesfully, login user automatically
      })
      .then(res => {
        console.log(res)
        setUser(res.username)
        setToken(res.token) 
        setSignUsername('')
        setSignPassword('')
        setShowSign(false)
      })
      .catch(err => console.log(err))    
  }

  //Message handlers
  const handleMessageChange = (event) => {
    setMessage(event.target.value) 
  }

  const submitMessage = (event) => {
    event.preventDefault()    
    
    if (message) {
      console.log('Sending a new message')
      socket.emit('new-message', {
          message: message,
          user: user
      })
      setMessage('')
    }   
  }

  //View handlers
  const handleShowLoginOrSign = () => {
    setShowLogin(!showLogin)
    setShowSign(!showSign)
  }

  return (
    <div className="App">
      <div className="grid-container">
        <div>navbar</div>
        {showLogin 
          ?
          <div className="main">
            <Login
              username={loginUsername}
              password={loginPassword} 
              handleSubmit={handleLoginSubmit}
              handleUsernameChange={handleLoginUsernameChange}
              handlePasswordChange={handleLoginPasswordChange}
              handleShowSign={handleShowLoginOrSign}
            />
          </div>
          : ''
        }
        {showSign
          ?
            <div className="main">
              <Sign
                handleShowLogin={handleShowLoginOrSign}
                username={signUsername}
                password={signPassword}
                handleUsernameChange={handleSignUsernameChange}
                handlePasswordChange={handleSignPasswordChange}
                handleSubmit={handleSignSubmit}            
            />
          </div>
          :''
        }     
        {showChat
          ?
            <div className="main">
              <Chatboard
                username={user}
                message={message}
                submitMessage={submitMessage}
                handleMessageChange={handleMessageChange}
                messages={messages}
                users={activeUsers}
              />
            </div>
          : ''
        }
        <div>footer</div>
      </div>  
    </div>    
  )
}

export default App
