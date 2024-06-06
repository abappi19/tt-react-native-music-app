import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = ()=>{

  return (
    <SafeAreaProvider>
      <RootLayout/>

      <StatusBar style="auto"/>
    </SafeAreaProvider>
  )

}


const RootLayout  = () => {

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown:false
      }}/>
    </Stack>
  )

}



// export default function RootLayout2() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }


export default App;
