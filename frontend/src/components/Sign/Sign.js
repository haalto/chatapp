import React from 'react'
import './Sign.css'

const Sign = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit,handleShowLogin }) => {
    return (
      <div className="sign">
        <div className="sign-header">
          <span className="sign-header-main">new user</span>
          <span className="sign-header-sub">please sign up below or <span className="sign-up-link" onClick={handleShowLogin}>login</span></span>
        </div>                                
        <form onSubmit={handleSubmit} className="sign-form">
          <input                         
            className="sign-input" 
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}>                                                        
          </input>
          <input 
            className="sign-input"  
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}>                              
          </input>
          <button 
            className="sign-button"
            type="submit">enter
          </button >
        </form>
      </div>
    )
}

export default Sign