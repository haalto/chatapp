import React from 'react'
import Users from '../Users/Users'
import './Chatboard.css'

const Chatboard = ( {userName, message, submitMessage, handleMessageChange, users, messages} ) => {
 
    let count = 0
  
    const mappedMessages = () => messages.map(m => {
      
      count += 1
      
      if (m) {
        return <p key={count}>{m.time} <strong>{m.username}</strong>: {m.message}</p>
      }
      return null        
    })
  
    return (

    <div className="ChatContainer">
      <div className="ChatUsers">
        <Users          
        users={users}
        />
      </div>
      <div className="Chat">       
        <div className="ChatBox">
            <div className="ChatMessages">
              {mappedMessages()}
            </div>     
        </div>
        <div className="ChatForm">
              <form onSubmit={submitMessage}>              
                <div className="input-group">               
                  <strong>{userName}:</strong>
                  <input
                    className="form-control ml-1" 
                    onChange={handleMessageChange} 
                    value={message}></input>
                  <div className="input-group-btn">
                    <button className="btn btn-primary ml-1" type="submit">Send</button>
                  </div>                     
                </div>                    
              </form>
          </div> 
      </div>
    </div>

    )
  }

  export default Chatboard