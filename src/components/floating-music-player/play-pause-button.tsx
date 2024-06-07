import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useIsPlaying } from "react-native-track-player";

export default function PlayPauseButton() {
  const { playing } = useIsPlaying();

  return (
    <TouchableOpacity>
      <Ionicons name={playing ? "pause" : "play"} size={24} color="white" />
    </TouchableOpacity>
  );
}
