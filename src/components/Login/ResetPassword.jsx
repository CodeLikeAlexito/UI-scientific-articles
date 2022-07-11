import React, {useState} from 'react';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [successSentEmail, setSuccessSentEmail] = useState(false);

    const sendResetPasswordRequest = async () => {
        setSuccessSentEmail(false);
        const URL = `http://localhost:4001/v1/api/scientist/password/forgot_password?email=${encodeURIComponent(email)}`;
        console.log(URL);
        const response = await fetch(URL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            method: "POST"
        });

        if(response.ok) { setSuccessSentEmail(true); }
        const data = await response.json();
        console.log("data " + data);
        return data;
    }

    return (
        <>
        <div className='container'>
            <span>Enter email address, where we will send reset password link.</span>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter email for reset password" aria-label="Resend password email" aria-describedby="basic-addon1"></input>
            <button type="button" className="btn btn-info" onClick={sendResetPasswordRequest}>
                Send request
            </button>
            {successSentEmail && <span>Email was successfully sent to {email}</span>}
        </div>
        </>
    );
}

export {ResetPassword};