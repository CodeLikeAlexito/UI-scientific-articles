import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { NavigationBar } from '../NavigationBar';
import {useNavigate} from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const EditScientist = () => {

    const getScientistURL = '/v1/api/scientist/id/';
    const editScientistURL = '/v1/api/scientist/';
    const navigate = useNavigate();
    const { id } = useParams();
    const [scientist, setScientist] = useState('');

    const initialValues = {
        username: scientist.username,
        firstName: scientist.firstName,
        lastName: scientist.lastName,
        city: scientist.city,
        address: scientist.address,
        phone: scientist.phone
        // roles: article.fieldOfScience
      };

      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const[isSubmit, setIsSubmit] = useState(false);
      const[isLoading, setIsLoading] = useState(false);

    const [roles, setRoles] = useState([]);
    const [password, setPassword] = useState('');

    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const getScientistById = async (id) => {
        const response = await fetch(`${getScientistURL}${id}`);
        const data = await response.json();
        console.log("data");
        console.log(data);
        setScientist(data);
        setFormValues(data);
        setRoles(data.roles);
        setPassword(data.password);
    }   

    useEffect(() => {
        getScientistById(id);
    }, []);

    const handleSelectDropdownChange = (event) => {
        const newState = roles.map(obj => {
            if(obj.name !== event.target.value) {
                return {...obj, name: event.target.value};
            }  
            return obj;
        })

        console.log(newState);

        setRoles(newState);
    }

    const sendRequest = async () => {
        
        const ScientistUpdateDto = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: password,
            city: formValues.city,
            address: formValues.address,
            phone: formValues.phone,
            username: formValues.username,
            roles: roles
        }

        console.log("scientistdto")
        console.log(ScientistUpdateDto);

        const response = await fetch(`${editScientistURL}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ScientistUpdateDto)
        });

        const { updScientist } = await response.json();

        if(response.ok) {
            toast.success("Successfully updated scientist!");
            setTimeout(() => {
                console.log("Succesfully updated");
                navigate("/admin");
            }, 2000)

            return updScientist;
        }
        
        let errorMessage = 'Error while Update scientist!';
        if(updScientist && updScientist.message){
            errorMessage = updScientist.message;
        }

        toast.error(errorMessage);
        setIsLoading(false); //check this also
        };

    const handleScientistEdit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setShow(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({...formValues, [name]: value});
    }

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

    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        sendRequest();
      }
    }, [formErrors]);

    return (
        <>
    <div><NavigationBar /></div>
    <MDBJumbotron>
        <div className='lead display-3 text-center'>Update scientist</div>
        <ToastContainer 
          draggable={false}
          transition={Zoom}
          autoClose={2000}
          position={toast.POSITION.TOP_CENTER}
        />
        <br />
        <MDBCardText className='text-center'>Here you can update scientist data.</MDBCardText>
        <MDBCardText className='text-center'>Please be carefull when working with personal data.</MDBCardText>
    </MDBJumbotron>
    <div className="container-sm border border-dark" key={scientist.id}>
      <br></br>
      <form className='form'>
        <div className='form-group'>
            <label>Username</label>
            <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.username}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>First name</label>
            <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.firstName}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Last name</label>
            <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.lastName}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.email}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>City</label>
            <input
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.city}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Address</label>
            <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.address}</p>
        </div>
        <br></br>
        <div className='form-group'>
            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="form-control"
            />
            <p className="text-sm text-danger">{formErrors.phone}</p>
        </div>
        <div className='form-group'>
            <label>Role</label>
            <select className="form-select" aria-label="Default select example" value={roles[0]?.name} onChange={handleSelectDropdownChange}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
        </div>
        <div className='footer text-center'>
            <button type='button' className='btn btn-primary' onClick={() => setShow(true)}>
                Update
            </button>
        </div>  
        <br></br>
      </form>
    </div>
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update scientist data</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure that you want to do this changes?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleScientistEdit}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    </>
    )
}

export {EditScientist};