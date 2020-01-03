import React from 'react'

const Users = ({ users }) => {
  
  const renderUsers = () => users.map(user => {  
    if (user) {
      return <p className="chat-user" key={user._id}>{user}</p>
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
