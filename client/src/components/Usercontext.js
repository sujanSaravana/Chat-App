import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const login = (token) => {
    setLoggedIn(true);
    setAccessToken(token);
  };

  const logout = () => {
    setLoggedIn(false);
    setAccessToken(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, accessToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
