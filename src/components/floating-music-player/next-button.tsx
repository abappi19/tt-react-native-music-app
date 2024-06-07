import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

export default function NextButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToNext();
      }}
    >
      <Ionicons name="play-forward" size={24} color="white" />
    </TouchableOpacity>
  );
}
