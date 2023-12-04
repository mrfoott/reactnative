import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import axios from "axios";
const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    if (username && password) {
      axios
        .post("https://dummyjson.com/users", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data) {
            Alert.alert("Register in successfully");
          } else {
            Alert.alert("Error", "Registration failed. Check your input.");
          }
        })
        .catch((error) => {
          Alert.alert("Error", "An error occurred while registering.");
          console.error(error);
        });
    } else {
      Alert.alert("Error", "Please enter your username and password");
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: "#1877F2",
            marginTop: 50,
            fontSize: 55,
            fontWeight: "bold",
          }}
        >
          Hello !
        </Text>
      </View>

      <Text style={styles.title}>Signup to get started</Text>
      <View style={styles.user}>
        <Text>Username </Text>
        <Text style={{ color: "red" }}>*</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <View style={styles.user}>
        <Text>Password </Text>
        <Text style={{ color: "red" }}>*</Text>
      </View>

      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Image
          source={require("../assets/logo/eye.png")}
          style={styles.eyeIcon}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          containerStyle={{ margin: 0, padding: 0 }}
        />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.con}>or continue with</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button2}>
          <Image
            source={require("../assets/logo/facebook.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText2}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Image
            source={require("../assets/logo/google.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText2}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.con}>
        Don't have an account?
        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    alignItem: "",
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  header: {
    display: "flex",
  },
  user: { flexDirection: "row" },
  title: {
    fontSize: 16, //
    margin: 8,
    color: "gray",
    width: 250,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: 400,
    paddingLeft: 10,
    borderRadius: 6,
  },
  eyeIcon: {
    position: "absolute",
    top: 17,
    right: 50,
    width: 30,
    height: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  checkboxLabel: {
    marginRight: 300,
  },

  button: {
    borderRadius: 6,
    backgroundColor: "#1877f2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 400,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  con: {
    textAlign: "center",

    fontSize: 16,
  },
  text: {
    color: "#333",
    marginTop: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: 300,
  },
  button2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 24,
    borderRadius: 6,
    width: "55%",
    marginRight: 70,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  signupText: {
    color: "blue",
    fontSize: 16,
  },
});
export default Register;
