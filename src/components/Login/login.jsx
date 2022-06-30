import React from "react";
import loginImg from "../../login.svg";
import { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom"
import {NavigationBar} from "../NavigationBar";
import AuthContext from "../../util/auth-context";

const Login = () => {

  const URL = 'http://localhost:4001/scientist';
  const authCtx = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[isLoading, setIsLoading] = useState(false);
  const[isSubmit, setIsSubmit] = useState(false);


  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formErrors);
    setIsLoading(true);
    setIsSubmit(true);

    const isValid = Object.keys(formErrors).length === 0;
    const errorsForm = validate(formValues);

    const AuthenticationRequest = {
      username: formValues.username,
      password: formValues.password,
    };

    const response = await fetch(`${URL}/auth`, {
      headers: {
          "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(AuthenticationRequest),
    });
    const data = await response.json();
    if(response.ok) {
      console.log("Inside login response ok");
      console.log(data);
      const expirationTime = new Date(
        new Date().getTime() + +data.expirationTime
      );
      authCtx.login(data.token, expirationTime.toISOString(), data.username);
      navigate("/");
      return data;
    }

    let errorMessage = 'Logging failed!';
    if(data && data.message){
      errorMessage = data.message;
    }
    alert(errorMessage);

    setIsLoading(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  }

  return (
    <>
      <div><NavigationBar /></div>
      <br></br>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form>
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
             <input type="text" name="username" placeholder="username" value={formValues.username} onChange={handleChange}/>
             <p className="text-sm text-danger">{formErrors.username}</p>
           </div>
           
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" placeholder="password" value={formValues.password} onChange={handleChange}/>
             <p className="text-sm text-danger">{formErrors.password}</p>
           </div>
         </div>
       </div>
       <div className="footer">
         {!isLoading && <button type="button" className="btn" onClick={handleLogin}>
           Login
         </button> }
         {isLoading && <p>Logining in ....</p>}
       </div>
     </div>
     </form>
     </>
  );
}

export {Login};