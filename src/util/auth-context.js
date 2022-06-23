import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  console.log("Inside calculate remaining time");  
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
    console.log("Inside retrieveStoredToken");
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
    console.log("Inside AuthContextProvider begining");
  const tokenData = retrieveStoredToken();
  console.log(tokenData);
//   const tokenData = null;
  
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = (!token || token.length === 0 ) ? false : true;
//   const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  }

  const loginHandler = (token, expirationTime) => {
    console.log("Inside loginHandler");
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

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