import React from 'react'
import './Login.css'

const Login = ( {newUserName, handleUserNameChange, submitUserName} ) => {
    return (
        <div className="Login"> 
            <div className="LoginContent" >
                <h3>hello anonymous </h3>
                <p>give yourself a name</p>
                <div className="input-group">                                   
                    <form onSubmit={submitUserName}>
                        <input 
                            className="LoginInput"
                            value={newUserName} 
                            onChange={handleUserNameChange}>          
                        </input>
                        <button 
                            className="LoginButton"
                            type="submit">enter
                        </button >
                    </form>
                </div> 
            </div>
        </div>
    )
}

export default Login