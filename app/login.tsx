import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    console.log("onLogin", email, password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
      // router.replace("/(tabs)");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRegister = async () => {
    console.log("onRegister");
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
      // router.replace("/(tabs)");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>

      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button onPress={onLogin} title="Login" />
      <Button onPress={onRegister} title="Create account" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});

export default LoginScreen;
