import { colors, fontSize } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
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
    <Tabs screenOptions={{
      tabBarActiveTintColor:colors.primary,
      tabBarLabelStyle:{
        fontSize:fontSize.xs,
        fontWeight:'500',
        color: '#888'

      },
      tabBarActiveBackgroundColor:'#000',
      tabBarInactiveBackgroundColor:'#333'
    }}>
    <Tabs.Screen name="favorite" options={{
      title:'Favorite',
      headerShown:false,
      tabBarIcon(props) {
        return <Ionicons name="heart" size={22} color="white"/>
      },
    }}/>
    <Tabs.Screen name="playlist" options={{
      title:'Playlist',
      headerShown:false,
      tabBarIcon(props) {
        return <Ionicons name="list" size={22} color="white"/>
      },
    }}/>
      <Tabs.Screen name="(songs)" options={{
        title:'Songs',
        headerShown:false,
        tabBarIcon(props) {
          return <Ionicons name="musical-note" size={22} color="white"/>
        },
      }}/>
      <Tabs.Screen name="artists" options={{
        title:'Artists',
        headerShown:false,
        tabBarIcon(props) {
          return <Ionicons name="people-circle" size={22} color="white"/>
        },
      }}/>
    </Tabs>
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
