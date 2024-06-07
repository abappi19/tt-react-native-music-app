import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

export default function PreviousButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToPrevious();
      }}
    >
      <Ionicons name="play-back" size={24} color="white" />
    </TouchableOpacity>
  );
}
