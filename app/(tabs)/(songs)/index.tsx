import { defaultStyles } from "@/styles";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
    style={defaultStyles.container}
    >
      <Text style={defaultStyles.text}>This is song screen</Text>
    </View>
  );
}
