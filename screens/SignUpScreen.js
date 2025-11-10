import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [userExists, setUserExists] = useState(false);

  const { signup } = useAuth();

  const validate = () => {
    const next = { email: '', password: '' };
    if (!email.trim()) next.email = 'Email is required';
    // Email pattern check
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.trim().length < 6)
      next.password = 'Password must be 6 characters or more';
    setErrors(next);
    return !next.email && !next.password;
  };

  const handleSignUp = async () => {
    setUserExists(false);

    if (!validate()) return;

    const signupStatus = await signup(email, password);

    if (signupStatus) {
      Alert.alert(
        'Sign up successful',
        `Welcome, ${email}!\nPlease log in with your credentials.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      setUserExists(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>Create a new account</Text>

            {userExists ? (
              <Text style={styles.existingUserText}>
                A user with this email already exist.
                {'\n'}
                Please use a different email.
              </Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignUp}
            >
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.backButtonView}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Return to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 12,
    marginTop: -8,
  },
  existingUserText: {
    color: '#ff3b30',
    marginBottom: 12,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#bf2430',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    height: 30,
    width: 130,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#bf2430',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen;
