import React from 'react'

const Users = ( {users} ) => {
  
    let userCount = 0
  
    const renderUsers = () => users.map(u => {
      
      userCount += 1
  
      if (u) {
        return <p className="chat-user" key={userCount}>{u}</p>
      }    
      return null
    }) 
    
    return (
      <div className="container">        
        <div>{renderUsers()}</div>
      </div>
      
    )
  }

export default Users
