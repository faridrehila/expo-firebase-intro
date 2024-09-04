import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  TextInput,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { signOut } from "firebase/auth";
import { auth, firestore } from "@/lib/firebase";
import { useEffect, useState } from "react";
import {
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [listOfTasks, setListOfTasks] = useState<string[]>([]);

  const onAddTask = async () => {
    setListOfTasks((curr) => [...curr, task]);
    setTask("");

    try {
      const docRef = await addDoc(collection(firestore, "todos"), {
        title: task,
        isCompleted: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "todos"));
        querySnapshot.forEach((doc) => {
          setListOfTasks((curr) => [...curr, doc.data().title]);
          console.log(`${doc.id} => ${doc.data()}`);
        });
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Button onPress={() => signOut(auth)} title="Se déconnecter" />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Todos!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Enter task"
        />
        <Button title="Add task" onPress={onAddTask} />
      </View>

      <View style={styles.tasksList}>
        {listOfTasks.map((task, index) => (
          <ThemedText key={index} type="title">
            {task}
          </ThemedText>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  form: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  tasksList: {
    marginTop: 20,
    gap: 20,
  },
});
