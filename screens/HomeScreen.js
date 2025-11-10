import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { logout, user } = useAuth();

  // Logout handler
  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.split('@')[0]}</Text>
            <Text style={styles.userEmail}>{user}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>Home Page</Text>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentText: {
    fontSize: 16,
    paddingTop: 25,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
  },
  logoutButton: {
    height: 30,
    width: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  logoutButtonText: {
    color: '#bf2430',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
