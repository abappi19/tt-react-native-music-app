import { colors } from "@/constants/tokens";
import { useTrackVolume } from "@/hooks/useTrackVolume";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export default function PlayerVolumeBar({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const { volume, updateVolume } = useTrackVolume();

  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const progress = useSharedValue(0);

  const isSliding = useSharedValue(false);

  progress.value = volume ?? 0;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          const nv = volume - 0.1;
          progress.value = nv;
          updateVolume(Math.max(0, nv));
        }}
      >
        <Ionicons
          name={volume > 0 ? "volume-low" : "volume-mute"}
          size={18}
          color={colors.icon}
        />
      </TouchableOpacity>

      <Slider
        minimumValue={min}
        maximumValue={max}
        progress={progress}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={(value) => {
          updateVolume(value);
          progress.value = value;
        }}
        renderBubble={()=>null}
        onSlidingComplete={() => (isSliding.value = false)}
        theme={{
          maximumTrackTintColor: "#dddddd49",
          minimumTrackTintColor: "#fff",
        }}
        containerStyle={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      />

      <TouchableOpacity
        onPress={() => {
          const nv = volume + 0.1;
          progress.value = nv;
          updateVolume(Math.min(1, nv));
        }}
      >
        <Ionicons name="volume-high" size={18} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
