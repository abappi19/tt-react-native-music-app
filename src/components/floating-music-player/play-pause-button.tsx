import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

export default function PlayPauseButton({ size = 24 }: { size?: number }) {
  const { playing } = useIsPlaying();

  return (
    <TouchableOpacity onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
      <Ionicons name={playing ? "pause" : "play"} size={size} color="white" />
    </TouchableOpacity>
  );
}
