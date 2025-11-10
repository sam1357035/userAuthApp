import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, updateLogin }) => {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // Load stored session on start
  useEffect(() => {
    loadStoredAuth();
  });

  const loadStoredAuth = async () => {
    try {
      // Create default credentials data for testing.
      const userCredentials = await AsyncStorage.getItem('userCredentialsData');
      if (userCredentials === null) {
        const defaultUserList = JSON.stringify([
          {
            email: 'john.smith@gmail.com',
            password: 'password',
          },
        ]);

        await AsyncStorage.setItem('userCredentialsData', defaultUserList);
      }
    } catch (error) {
      console.error('ERROR retrieving user credentials:\n', error.message);
    }

    // Check if user is still logged in.
    try {
      const storedUser = await AsyncStorage.getItem('currentUserData');

      if (storedUser) {
        setUser(storedUser);
        updateLogin(true);
      }
    } catch (error) {
      console.error(
        'An ERROR occured when retrieving current user:\n',
        error.message,
      );
    }
  };

  // Login logic
  const login = async (email, password) => {
    // Authenticate login.
    try {
      const allUsers = JSON.parse(
        await AsyncStorage.getItem('userCredentialsData'),
      );
      const foundUser = allUsers.find(u => u.email === email);

      if (foundUser) {
        // Check password.
        if (foundUser.password === password) {
          // Login successful
          setUser(foundUser.email);
          updateLogin(true);
          await AsyncStorage.setItem('currentUserData', foundUser.email);
          return true;
        }
      }
      // Login failed
      return false;
    } catch (error) {
      console.error('An ERROR occured when logging in:\n', error.message);
    }
  };

  // Logout logic
  const logout = async () => {
    try {
      setUser(null);
      updateLogin(false);
      await AsyncStorage.removeItem('currentUserData');
    } catch (error) {
      console.error('An ERROR occured when logging out:\n', error.message);
    }
  };

  // Signup logic
  const signup = async (email, password) => {
    try {
      const allUsers = JSON.parse(
        await AsyncStorage.getItem('userCredentialsData'),
      );
      const foundUser = allUsers.find(u => u.email === email);

      if (foundUser) {
        // Invalid signup. User exists.
        return false;
      }

      //Sign up user.
      allUsers.push({ email, password });
      await AsyncStorage.setItem(
        'userCredentialsData',
        JSON.stringify(allUsers),
      );
      return true;
    } catch (error) {
      console.error('An ERROR occured when signing up user: \n', error.message);
    }
  };

  const contextValue = {
    user,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
