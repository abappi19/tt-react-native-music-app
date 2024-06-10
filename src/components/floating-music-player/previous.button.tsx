import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

export default function PreviousButton({ size = 24 }: { size?: number }) {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToPrevious();
      }}
    >
      <Ionicons name="play-back" size={size} color="white" />
    </TouchableOpacity>
  );
}
