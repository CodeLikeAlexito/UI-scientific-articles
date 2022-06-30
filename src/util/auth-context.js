import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  username: '',
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

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    username: storedUsername,
  };
};

export const AuthContextProvider = (props) => {
  // console.log("Inside AuthContextProvider begining");
  const tokenData = retrieveStoredToken();
  console.log(tokenData);
//   const tokenData = null;
  
  let initialToken;
  let initialUsername;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUsername = tokenData.username;
  }

  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);

  const userIsLoggedIn = (!token || token.length === 0 ) ? false : true;
//   const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('username');
  }

  const loginHandler = (token, expirationTime, username) => {
    console.log("Inside loginHandler");
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('username', username);

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log("Remaining time: " + remainingTime);
    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  console.log(userIsLoggedIn)

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
    console.log("Inside useEffect");
    if (tokenData) {
      console.log(tokenData.duration);
    //   logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData/*, logoutHandler*/]);

  const contextValue = {
    token: token,
    username: username,
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