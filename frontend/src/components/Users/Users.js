import React from 'react'

const Users = ({ users }) => {

  let count = 0

  const renderUsers = () => users.map(user => {  
    if (user) {
      count += 1
      return <p className="chat-user" key={count}>{user}</p>
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
