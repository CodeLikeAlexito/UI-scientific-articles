import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  username: '',
  role: [],
  admin: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  // console.log("Inside calculate remaining time");  
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  // console.log("Inside retrieveStoredToken");
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedUsername = localStorage.getItem('username');
  const storedRole = localStorage.getItem('role');
  const storedIsAdmin = localStorage.getItem('admin');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }
  console.log('retrivesStoredToken');
  console.log(
    {
      token: storedToken,
      role: storedRole,
      admin: storedIsAdmin,
      duration: remainingTime,
      username: storedUsername,
    }
  )
  return {
    token: storedToken,
    role: storedRole,
    admin: storedIsAdmin,
    duration: remainingTime,
    username: storedUsername,
  };
};

export const AuthContextProvider = (props) => {
  // console.log("Inside AuthContextProvider begining");
  const tokenData = retrieveStoredToken();
  console.log("AuthContextProvider");
  console.log(tokenData);
//   const tokenData = null;
  
  let initialToken;
  let initialUsername;
  let initialRole;
  let initialIsAdmin;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUsername = tokenData.username;
    initialRole = tokenData.role;
    initialIsAdmin = tokenData.admin;
  }

  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);
  const [role, setRole] = useState(initialRole);
  const [admin, setIsAdmin] = useState(initialIsAdmin);

  const userIsLoggedIn = (!token || token.length === 0 ) ? false : true;
//   const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('admin');
  }

  const loginHandler = (token, expirationTime, username, role, admin) => {
    // console.log("Inside loginHandler");
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('admin', admin);

    const remainingTime = calculateRemainingTime(expirationTime);
    // console.log("Remaining time: " + remainingTime);
    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // console.log(userIsLoggedIn);

//   const logoutHandler = useCallback(() => {
//     console.log("Inside logoutHandler");
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');

//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);

  useEffect(() => {
    // console.log("Inside useEffect");
    if (tokenData) {
      console.log("useEffect");
      console.log(tokenData);
      retrieveStoredToken();
    //   logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData/*, logoutHandler*/]);

  const contextValue = {
    token: token,
    username: username,
    role: role,
    admin: admin,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;