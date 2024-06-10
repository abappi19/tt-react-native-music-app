import { colors } from "@/constants/tokens";
import { formatSecondsToMinute } from "@/helper/miscellanious";
import { defaultStyles } from "@/styles";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

export default function PlayerProgressBar({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const { duration, position } = useProgress();

  const isSliding = useSharedValue(false);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const progress = useSharedValue(0);

  const elapsedTime = formatSecondsToMinute(position);
  const remainingTime = formatSecondsToMinute(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={[style]}>
      <Slider
        minimumValue={min}
        maximumValue={max}
        progress={progress}
        onSlidingStart={() => (isSliding.value = true)}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;

          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        renderBubble={() => null}
        theme={{
          maximumTrackTintColor: "#dddddd49",
          minimumTrackTintColor: "#fff",
        }}
        containerStyle={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      />

      <View style={styles.container}>
        <Text style={[defaultStyles.text, { fontSize: 12 }]}>
          {elapsedTime}
        </Text>
        <Text style={[defaultStyles.text, { fontSize: 12 }]}>
          - {remainingTime}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    gap: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
