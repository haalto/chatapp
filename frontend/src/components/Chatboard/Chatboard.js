import React, { useRef, useEffect } from 'react'
import Users from '../Users/Users'
import './Chatboard.css'

const Chatboard = ( {username, message, submitMessage, handleMessageChange, users, messages} ) => {
 
    let count = 0
  
    const renderMessages = () => messages.map(m => {
      
      count += 1
      
      if (m) {
        return <p className="chat-message" key={count}>{m.time} <strong>{m.username}</strong>: {m.message}</p>
      }
      return null        
    })

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
  
    return (      
      <div className="chat">           
        <div className="chat-users">   
          <span className="chat-users-header">Users online:</span>  
            <Users          
            users={users}
            />
        </div>      
        <div className="chat-messages">          
          {renderMessages()}  
          <div ref={messagesEndRef}></div>
        </div>
        <div className="chat-form">
              <form onSubmit={submitMessage}>                 
                  <strong>{username}:</strong>
                  <input
                    className="chat-input" 
                    onChange={handleMessageChange} 
                    value={message}>                    
                  </input>
                  <button className="chat-button" type="submit">Send</button>              
              </form>
          </div> 
    </div>
    )
  }

  export default Chatboard