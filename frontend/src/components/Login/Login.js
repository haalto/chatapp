import React from 'react'
import './Login.css'

const Login = ( {newUserName, handleUserNameChange, submitUserName} ) => {
    return (
        <div className="login">
            <div className="login-header">
                <span className="login-header-main">hello anonymous </span>
                <span className="login-header-sub">give yourself a name</span>
            </div>
            <div className="login-form">                                   
                <form onSubmit={submitUserName}>
                    <input 
                        className="login-input"
                        value={newUserName} 
                        onChange={handleUserNameChange}>          
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