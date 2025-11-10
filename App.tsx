/**
 * User Authentication App
 * Login Screen Implementation
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (loginStatus: boolean) =>
    setIsLoggedIn(loginStatus);

  return (
    <AuthProvider updateLogin={updateLoginStatus}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isLoggedIn ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
