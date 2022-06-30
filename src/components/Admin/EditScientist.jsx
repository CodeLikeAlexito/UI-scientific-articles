import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { NavigationBar } from '../NavigationBar';
import {useNavigate} from "react-router-dom";
import {
    MDBJumbotron,
    MDBCardText
  } from "mdbreact";

const EditScientist = () => {

    const getScientistURL = 'http://localhost:4001/scientist/id/';
    const editScientistURL = 'http://localhost:4001/scientist/';
    const navigate = useNavigate();
    const { id } = useParams();
    const [scientist, setScientist] = useState('');

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState([]);

    const getScientistById = async (id) => {
        const response = await fetch(`${getScientistURL}${id}`);
        const data = await response.json();
        setScientist(data);
        console.log("DAta:")
        console.log(data);
        setCurrentUser(data);
    }

    const setCurrentUser = (data) => {
        setUsername(data.username);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setCity(data.city);
        setAddress(data.address);
        setPhone(data.phone);
        setRoles(data.roles);
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

    const updateScientist = async () => {
        const updatedScientist = { username, firstName, lastName, email, city, address, phone, roles };
        console.log(updatedScientist);
        const response = await fetch(`${editScientistURL}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedScientist)
        });
        const { updScientist } = await response.json();
        if(response.ok) {
            alert("Succesfully updated");
            navigate("/admin");
            return updScientist;
        }
        
        console.log("Error updating");
    };

    return (
        <>
    <div><NavigationBar /></div>
    <MDBJumbotron>
        <div className='lead display-3 text-center'>View and update client</div>
        <br />
        <MDBCardText className='text-center'>Here you can add and create new article. Please notice that after creation, your article won't be automatically posted.</MDBCardText>
        <MDBCardText className='text-center'>Administrator needs to review what you've posted and if everything is okay, your article will be publsihed.</MDBCardText>
    </MDBJumbotron>
    <div className="container-sm border border-dark" key={scientist.id}>
      <br></br>
      <form className='form'>
        <input
            type="hidden"
            name="id"
            value={scientist.id}
        />
        <div className='form-group'>
            <label>Username</label>
            <input
                // {...register("username")}
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
            />
            {/* {errors.yearPublished && (
              <p className="text-sm text-danger">{errors.yearPublished.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>First name</label>
            <input
                // {...register('firstName')} 
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
            />
            {/* {errors.authors && (
              <p className="text-sm text-danger">{errors.authors.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Last name</label>
            <input
                // {...register("lastName")} 
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
            />
        </div>
        <br></br>
        <div className='form-group'>
            <label>Email</label>
            <input
                // {...register("email")} 
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
            />
            {/* {errors.academicJournal && (
              <p className="text-sm text-danger">{errors.academicJournal.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>City</label>
            <input
                // {...register("city")} 
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Address</label>
            <input
                // {...register("address")} 
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <br></br>
        <div className='form-group'>
            <label>Phone</label>
            <input
                // {...register("phone")} 
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
            />
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <div className='form-group'>
            <label>Role</label>
            <select className="form-select" aria-label="Default select example" value={roles[0]?.name} onChange={handleSelectDropdownChange}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
            </select>
            {/* {errors.fieldOfScience && (
              <p className="text-sm text-danger">{errors.fieldOfScience.message}</p>
            )} */}
        </div>
        <div className='footer'>
            <button type='button' className='btn' onClick={updateScientist}>
                Update
            </button>
        </div>  
        <br></br>
      </form>
    </div>
    </>
    )
}

export {EditScientist};