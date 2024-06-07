import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";
import {StackScreenWithSearchBar} from '@/constants/layout';
import { colors } from "@/constants/tokens";




export default function RootLayout(){

  return (
    <View style={defaultStyles.container}>
      <Stack>
      <Stack.Screen name="index" options={{
        ...StackScreenWithSearchBar,
        headerTitle:'Songs',
        headerTintColor:colors.text,
        headerBackground() {
            return <View style={{backgroundColor:colors.background}}>
            </View>
        },
      }}/>

    </Stack>
    </View>
  )

}

