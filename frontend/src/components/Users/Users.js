import React from 'react'

const Users = ( {users} ) => {
  
    let userCount = 0
  
    const mappedUsers = () => users.map(u => {
      
      userCount += 1
  
      if (u) {
        return <p key={userCount}>{u}</p>
      }    
      return null
    }) 
    
    return (
      <div className="container">
        <h5>Following users are online:</h5>
        <div>{mappedUsers()}</div>
      </div>
      
    )
  }

export default Users
