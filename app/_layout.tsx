import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "@/lib/firebase";

import { useColorScheme } from "@/hooks/useColorScheme";
import { app, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  console.log("app", app);
  console.log("auth", auth);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      onAuthStateChanged(auth, (user) => {
        console.log("user", user);

        if (user) {
          router.replace("/(tabs)");
          return;
        }
        // user === null
        router.replace("/login");
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
