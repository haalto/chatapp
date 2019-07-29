import React, { useState, useEffect } from 'react'
import './App.css'
import Chatboard from '../Chatboard/Chatboard'
import Login from '../Login/Login'
import io from 'socket.io-client'
const socket = io('http://localhost:3001')

//https://medium.com/@rossbulat/react-hooks-managing-web-sockets-with-useeffect-and-usestate-2dfc30eeceec
//https://www.youtube.com/watch?v=rxzOqP9YwmM
//https://socket.io/get-started/chat/
//https://www.youtube.com/watch?v=tHbCkikFfDE
//https://css-tricks.com/build-a-chat-app-using-react-hooks-in-100-lines-of-code/
//https://www.youtube.com/watch?v=f8el0g_rXbY

const App = () => {  

  //Client data
  const [ userName, setUserName ] = useState('')
  const [ newUserName, setNewUserName ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ showLogin, setShowLogin] = useState(true)
  const [ showChat, setShowChat ] = useState(false) 

  //Other clients and messages
  const [messages, setMessages] = useState([''])
  const [ activeUsers, setActiveUsers] = useState([''])


  //Effects*****************************************
  useEffect(() => {
    
    if (userName) {
      setShowLogin(false)
      setShowChat(true)
      socket.emit('new-user', {
        username: userName
      })
    }
  }, [userName])

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
  }, []) 

  //Handlers*************************************

  const submitUserName = (event) => {  
    event.preventDefault()
    setUserName(newUserName)
    setNewUserName('')
  }

  const handleUserNameChange = (event) => {
    setNewUserName(event.target.value)
  }

  const submitMessage = (event) => {
    event.preventDefault()    
    
    if (message) {
      console.log('Sending a new message')
      socket.emit('new-message', {
          message: message,
          username: userName
      })
      setMessage('')
    }   
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <div className="App">
      {showLogin 
        ?
          <Login
            newUserName={newUserName} 
            submitUserName={submitUserName}
            handleUserNameChange={handleUserNameChange}
          />
        : ''
      }
      {showChat
        ?
          <Chatboard
            userName={userName}
            message={message}
            submitMessage={submitMessage}
            handleMessageChange={handleMessageChange}
            messages={messages}
            users={activeUsers}
          />
        : ''
      }
      
    </div>    
  )
}

export default App
