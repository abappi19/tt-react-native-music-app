import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    // <NavigationContainer>
      <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayout />

        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
    // </NavigationContainer>
  );
};

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

// export default function RootLayout2() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }

export default App;
