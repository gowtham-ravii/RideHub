import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, BackHandler, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from "react-native";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const backImage = require("../../assets/background1.jpg");

export default function Login({ navigation }) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      setIsLoading(true); // Set isLoading to true when login is initiated

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login success");
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          setIsLoading(false); // Set isLoading back to false when login fails
          Alert.alert("Login error", err.message);
        });
    }
  }

  const resetpassword = () => {
    if (email != null) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("email sent successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        })
    } else {
      alert("Please enter a valid email");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.header}>RIDE HUB</Text>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {isLoading ? ( // Show ActivityIndicator when isLoading is true
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => resetpassword()}><Text style={{ fontWeight: 'bold', color: '#BEE261', textAlign: 'center', marginTop: 10, fontSize: 18 }} >
          Forget Password</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: '#BEE261', fontWeight: '600', fontSize: 17 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#000000",
    alignSelf: "center",
    paddingBottom: 24,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "#ffffff",
    alignSelf: "center",
    paddingBottom: 100,
    paddingLeft: 156,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#000000',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
