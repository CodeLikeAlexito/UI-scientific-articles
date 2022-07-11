import Recat, {useState} from 'react';
import { useSearchParams } from "react-router-dom";
import queryString from 'query-string';

const ForgetPassword = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmPassword] = useState('');
    searchParams.get("token");
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')
    console.log(token);

    const sendRequest = async () => {

        const PasswordResetDto = {
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        };

        console.log(PasswordResetDto);

        const URL = `http://localhost:4001/v1/api/scientist/password/reset_password?token=${encodeURIComponent(token)}`;
        console.log(URL);

        const response = await fetch(URL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            method: "POST",
            body: JSON.stringify(PasswordResetDto)
          });

          console.log(response.json());

          if(response.ok) {
              console.log('success');
          }

          const data = await response.json();
          console.log(data);
            
          return data;

    };

    return (
        <div className='container'>
           <h1> Forget password page</h1>
           <input onChange={(e) => setNewPassword(e.target.value)} type="text" className="form-control" placeholder="Enter new password here" aria-label="New password" aria-describedby="basic-addon1"></input>
           <input onChange={(e) => setConfirmPassword(e.target.value)} type="text" className="form-control" placeholder="Enter confirm new password here" aria-label="Confirm password" aria-describedby="basic-addon1"></input>
           <button type="button" className="btn btn-info" onClick={sendRequest}>
           Reset password
         </button>
        </div>
    );
}

export {ForgetPassword};