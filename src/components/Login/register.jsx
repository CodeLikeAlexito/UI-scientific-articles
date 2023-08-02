import React from "react";
import loginImg from "../../login.svg";
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {NavigationBar} from '../../components/NavigationBar';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const URL = '/v1/api/scientist/';

  const navigate = useNavigate();
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    address: "",
    phone: "",
    username: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const[isLoading, setIsLoading] = useState(false);
  const[isSubmit, setIsSubmit] = useState(false);

  const sendRequest = async () => {

    setIsLoading(true);

    const ClientRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      city: formValues.city,
      address: formValues.address,
      phone: formValues.phone,
      username: formValues.username
    };

    const response = await fetch(`${URL}`, {
      headers: {
          "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(ClientRegistrationDto),
    });

    const data = await response.json();

    

    if(response.ok) {
      toast.success("Successfully registered!");
      setTimeout(() => {
        navigate("/login");
      }, 2000)
      
      return data;
    }

    let errorMessage = 'Registration failed!';
    if(data && data.message){
      errorMessage = data.message;
    }

    toast.error(errorMessage);
    setIsLoading(false); //check this also

  }

  const handleRegistration = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      sendRequest();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.city) {
      errors.city = "City is required!";
    }

    if (!values.address) {
      errors.address = "Address is required!";
    }

    if (!values.phone) {
      errors.phone = "Phone is required!";
    }

    if (!values.username) {
      errors.username = "Username is required!";
    }

    return errors;
  }

  return (
    <>
    <div><NavigationBar /></div>
    <br></br>
    <form>
    <div className="base-container">
        <div className="header">Register</div>
        <ToastContainer 
          draggable={false}
          transition={Zoom}
          autoClose={2000}
          position={toast.POSITION.TOP_CENTER}
        />
        <span>Already have an account? <a href="/login">Sign in here</a></span>
        <br></br>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">First name</label>
              <input type="text" name="firstName" placeholder="Enter first name" value={formValues.firstName} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.firstName}</p>
            </div>
            <div className="form-group">
              <label htmlFor="username">Last name</label>
              <input type="text" name="lastName" placeholder="Enter last name" value={formValues.lastName} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.lastName}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Email address" value={formValues.email} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Enter username" value={formValues.username} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.username}</p>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter password" value={formValues.password} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.password}</p>
            </div>
            <div className="form-group">
              <label htmlFor="username">City</label>
              <input type="text" name="city" placeholder="Enter city" value={formValues.city} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.city}</p>
            </div>
            <div className="form-group">
              <label htmlFor="username">Address</label>
              <input type="text" name="address" placeholder="Enter address" value={formValues.address} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.address}</p>
            </div>
            <div className="form-group">
              <label htmlFor="username">Phone</label>
              <input type="text" name="phone" placeholder="Enter phone number" value={formValues.phone} onChange={handleChange}/>
              <p className="text-sm text-danger">{formErrors.phone}</p>
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
      </form>
      <br></br>
      </>
  );
}

export {Register}