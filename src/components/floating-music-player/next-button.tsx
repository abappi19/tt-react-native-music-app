import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function NextButton() {
  return (
    <TouchableOpacity>
      <Ionicons name="play-forward" size={24} color="white" />
    </TouchableOpacity>
  );
}
