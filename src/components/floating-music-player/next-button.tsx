import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TrackPlayer from "react-native-track-player";

export default function NextButton({ size = 24 }: { size?: number }) {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToNext();
      }}
    >
      <Ionicons name="play-forward" size={size} color="white" />
    </TouchableOpacity>
  );
}
