import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ScientistsComponent = () => {

    const URL = '/v1/api/scientist/';
    const [scientists, setScientists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        handleScientists([]);
    }, [])

    const handleScientists = async () => {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        if(response.ok) {
            setScientists(data);
        }
    }

    const redirectEdit = (id) => {
        navigate(`/admin/scientist/${id}`);
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${URL}${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if(response.ok) {
            toast.success("Successfully deleted scientist!");
            setTimeout(() => {
                handleScientists();
            }, 1000)
        }
    }

    const DisplayData = scientists.map(
        (scientist) => {
            return (
                <tr key={scientist.id}>
                    <td>{scientist.firstName}</td>
                    <td>{scientist.lastName}</td>
                    <td>{scientist.username}</td>
                    <td>{scientist.email}</td>
                    <td>{scientist.address}</td>
                    <td>{scientist.city}</td>
                    <td>{scientist.phone}</td>
                    <td>{scientist.roles[0].name}</td>
                    <td scope="col">
                    <ToastContainer 
                    draggable={false}
                    transition={Zoom}
                    autoClose={1000}
                    position={toast.POSITION.TOP_CENTER}
                    />
                        <button className='btn btn-danger' onClick={() => handleDelete(scientist.id)}>
                            Delete
                        </button>
                    </td>
                    <td scope="col"><button className='btn btn-warning' onClick={() => redirectEdit(scientist.id)}>Edit</button></td>
                </tr>
            )
        }
    )

    return(
        <>
        <div className='container-xxl border'>
            <br></br>
            <h1 className='text-center'>Registered scientists</h1>
            <table className="table">
                <thead>
                    <tr>
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Phone</th>
                    <th scope="col">User role</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
        </>
    );
}

export {ScientistsComponent};