import React from "react";
import loginImg from "../../login.svg";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {NavigationBar} from '../../components/NavigationBar';

const Register = () => {

  const URL = 'http://localhost:4001/scientist/';

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const[isLoading, setIsLoading] = useState(false);

  const handleRegistration = async () => {
    const ClientRegistrationDto = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      city: city,
      address: address,
      phone: phone,
      username: username
    };

    const response = await fetch(`${URL}`, {
      headers: {
          "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(ClientRegistrationDto),
    });

    const data = await response.json();
    setIsLoading(true); //maybe should be moved some rows upper

    if(response.ok) {
      alert("Successfully registrated");
      navigate("/");
      return data;
    }

    let errorMessage = 'Registration failed!';
    if(data && data.message){
      errorMessage = data.message;
    }

    alert(errorMessage);
    setIsLoading(false); //check this also
  }

  // const sendRegistrationRequest = () => {

  //   const ClientRegistrationDto = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //     city: city,
  //     address: address,
  //     phone: phone,
  //     username: username
  //   };

  //   setIsLoading(true);
  //   fetch("http://localhost:4001/client/register", {
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(ClientRegistrationDto),
  //   })
  //   .then((response) => {
  //     setIsLoading(false);

  //     if(response.ok) {
  //       // ...
  //       // console.log("Successfully registrated");
  //       alert("Successfully registrated");
  //       navigate("/");
  //       return response.json();
  //     } else {
  //       return response.json().then(data => {
  //         // show an error modal
  //         let errorMessage = 'Registration failed!';
  //         if(data && data.message){
  //           errorMessage = data.message;
  //         }
          
  //         throw new Error(errorMessage);
  //       });
  //     }
  //     }).then(data => {
  //       console.log(data);
  //     })
  //     .catch(err =>{
  //       alert(err.message);
  //     });
  // }

  return (
    <>
    <div><NavigationBar /></div>
    <br></br>
    <div className="base-container">
        <div className="header">Register</div>
        <br></br>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">First name</label>
              <input type="text" name="firstName" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Last name</label>
              <input type="text" name="lastName" placeholder="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">City</label>
              <input type="text" name="city" placeholder="city" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Address</label>
              <input type="text" name="address" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Phone</label>
              <input type="text" name="phone" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="footer">
          {!isLoading && <button type="button" className="btn" onClick={handleRegistration}>
            Register
          </button> }
          {isLoading && <p>Sending request ....</p>}
        </div>
      </div>
      <br></br>
      </>
  );
}

export {Register}