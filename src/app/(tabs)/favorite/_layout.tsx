import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StackScreenWithSearchBar } from '@/constants/layout';



export default function RootLayout(){

  return (
    <View style={defaultStyles.container}>
      <Stack>
      <Stack.Screen name="index" options={{
        ...StackScreenWithSearchBar,
        headerTitle:'Favorite',
      }}/>

    </Stack>
    </View>
  )

}

