import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const ScientistsComponent = () => {

    const URL = 'http://localhost:4001/client/';
    const [scientists, setScientists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        handleScientists([]);
    }, [])

    const handleScientists = async () => {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        setScientists(data);
        console.log(data);
    }

    const redirectEdit = (id) => {
        navigate(`/scientist/${id}`);
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${URL}${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        handleScientists();
    }

    const DisplayData = scientists.map(
        (scientist) => {
            return (
                <tr key={scientist.id}>
                    <td>{scientist.id}</td>
                    <td>{scientist.firstName}</td>
                    <td>{scientist.lastName}</td>
                    <td>{scientist.username}</td>
                    <td>{scientist.email}</td>
                    <td>{scientist.address}</td>
                    <td>{scientist.city}</td>
                    <td>{scientist.phone}</td>
                    <td>{scientist.roles[0].name}</td>
                    <td scope="col"><button onClick={()=> handleDelete(scientist.id)}>Delete</button></td>
                    <td scope="col"><button onClick={() => redirectEdit(scientist.id)}>Edit</button></td>
                </tr>
            )
        }
    )

    return(
        <div className='container-xxl border'>
            <h1 className='text-center'>Registered users</h1>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
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
    );
}

export {ScientistsComponent};