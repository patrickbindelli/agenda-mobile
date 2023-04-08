import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import * as React from "react";
import Home from "./src/pages/Home";
import styles from "./global/styles";
import Details from "./src/pages/Details";
import Form from "./src/pages/Form";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createNativeStackNavigator();

function App() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  statusBarAnimation: "slide",
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    headerTitle: "Contatos",
                    headerStyle: { backgroundColor: "#161618" },
                    headerShadowVisible: false,
                    headerTitleStyle: { color: "#fff" },
                    statusBarColor: "#161618",
                  }}
                />
                <Stack.Screen
                  name="Details"
                  component={Details}
                  options={{
                    animation: "slide_from_right",
                    headerTitle: "",
                    headerStyle: { backgroundColor: "#2C2250" },
                    headerShadowVisible: false,
                    headerTintColor: "#fff",
                    headerTitleStyle: { color: "#fff" },
                    statusBarColor: "#2C2250",
                  }}
                />
                <Stack.Screen
                  name="Add"
                  component={Form}
                  options={{
                    animation: "fade_from_bottom",
                    headerTitle: "Adicionar Contato",
                    headerStyle: { backgroundColor: "#161618" },
                    headerShadowVisible: false,
                    headerTintColor: "#fff",
                    headerTitleStyle: { color: "#fff" },
                    statusBarColor: "#161618",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}

export default App;
