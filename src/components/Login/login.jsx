import React from "react";
import loginImg from "../../login.svg";
import {useLocalState} from "../../util/useLocalStorage";
import { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import {NavigationBar} from "../NavigationBar";
import AuthContext from "../../util/auth-context";

const Login = () => {

  const authCtx = useContext(AuthContext);

  const[isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const sendLoginRequest = () => {

    const AuthenticationRequest = {
        username: username,
        password: password,
    };

    setIsLoading(true);
    fetch("http://localhost:4001/client/auth", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(AuthenticationRequest),
    })
    .then((response) => {
      setIsLoading(true);

      if(response.ok) {
        // alert("Successfully logged in");
        // navigate("/");
        return response.json();
      } else {
          return response.json().then(data => {
            let errorMessage = 'Logging failed!';
            if(data && data.message){
              errorMessage = data.message;
            }
            
            throw new Error(errorMessage);
          });
        }
      }).then(data => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expirationTime
        );
        authCtx.login(data.token, expirationTime.toISOString(), data.username);
        navigate("/");
      })
      .catch(err =>{
        alert(err.message);
      });
  };

  return (
    <>
      <div><NavigationBar /></div>
      <br></br>
      <div className="base-container">
       <div className="header">Login</div>
       <br></br>
       <div className="content">
         <div className="image">
           <img src={loginImg} alt="test" />
         </div>
         <div className="form">
           <div className="form-group">
             <label htmlFor="username">Username</label>
             <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
           </div>
         </div>
       </div>
       <div className="footer">
         {!isLoading && <button type="button" className="btn" onClick={() => sendLoginRequest()}>
           Login
         </button> }
         {isLoading && <p>Logining in ....</p>}
       </div>
     </div>
     </>
  );
}

export {Login};