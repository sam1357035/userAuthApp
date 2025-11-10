import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const { login } = useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Account login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailInput}
            onChangeText={setEmailInput}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={passwordInput}
            onChangeText={setPasswordInput}
          />

          {loginError ? (
            <Text style={styles.errorText}>
              Your email or password was incorrect
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
              const loginSuccess = await login(emailInput, passwordInput);
              if (!loginSuccess) {
                setLoginError(true);
              }
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                setLoginError(false);
                navigation.navigate('SignUp');
              }}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 8,
    marginLeft: 5,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 45,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#bf2430',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    color: '#bf2430',
    fontWeight: '600',
  },
});

export default LoginScreen;
