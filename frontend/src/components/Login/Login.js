import React from 'react'
import './Login.css'

const Login = ( {username, password, handleUsernameChange, handlePasswordChange, handleSubmit,handleShowSign} ) => {
    return (
        <div className="login">
            <div className="login-header">
                <span className="login-header-main">hello anonymous</span>
                <span className="login-header-sub">login or <span className="sign-up-link" onClick={handleShowSign}>sign up</span></span>
            </div>
            <div className="login-form">                                   
                <form onSubmit={handleSubmit}>
                    <input 
                        className="login-input"
                        value={username} 
                        onChange={handleUsernameChange}
                        placeholder="username">                                  
                    </input>
                    <input 
                        className="login-input"  
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}>          
                    </input>
                    <button 
                        className="login-button"
                        type="submit">enter
                    </button >
                </form>
            </div> 
        </div>
    )
}

export default Login