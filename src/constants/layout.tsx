import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "./tokens";
import { View } from "react-native";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerTintColor: colors.text,
  headerBackground: () => {
    return <View style={{ backgroundColor: colors.background }}></View>;
  },
  // headerLargeTitle: true,
  // headerLargeStyle: {
  //   backgroundColor: "red",
  // },
  // headerLargeTitleStyle: {
  //   color: colors.text,
  // },
  // headerTintColor: colors.text,
  // // headerTransparent: true,
  // headerBlurEffect: "prominent",
  // headerShadowVisible: false,
};
