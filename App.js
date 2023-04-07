// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import * as React from "react";
import Home from "./src/pages/Home";
import styles from "./global/styles";
import Details from "./src/pages/Details";
import Form from "./src/pages/Form";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="Add" component={Form} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
