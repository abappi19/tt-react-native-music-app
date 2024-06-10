import {
  DevSettings,
  FlatList,
  FlatListProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TrackListItem from "./track-list-item";
import TrackPlayer, {
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
import { useQueue } from "@/store/queue";
import { useRef } from "react";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  queueId: string;
  tracks: any[];
};

export default function TrackList({
  queueId,
  tracks,
  ...flatlistProps
}: TrackListProps) {
  const { playing } = useIsPlaying();
  const activeTrack = useActiveTrack();

  const { activeQueueId, setActiveQueueId } = useQueue();
  const queueOffset = useRef(0);

  const handleTrackSelect = async (track: Track) => {
    const currentTrackIndex = tracks.findIndex(
      (t: Track) => t.url === track.url
    );

    if (currentTrackIndex === -1) return;

    const isQueueChanged = queueId !== activeQueueId;

    if (isQueueChanged) {
      const beforeTrack = tracks.slice(0, currentTrackIndex);
      const afterTrack = tracks.slice(currentTrackIndex + 1);

      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.add(afterTrack);
      await TrackPlayer.add(beforeTrack);

      await TrackPlayer.play();

      queueOffset.current = currentTrackIndex;
      setActiveQueueId(queueId);
    } else {
      // tracks = [20]; index = 1; current = 5;
      // 1 - 5 // 20 + 1 - 5 // 16 ||  5 + 16 = 21 means 1
      // index = 10; current = 5;
      // 10 - 5 = 5;
      const nextTrackIndex =
        currentTrackIndex - queueOffset.current < 0
          ? tracks.length + currentTrackIndex - queueOffset.current
          : currentTrackIndex - queueOffset.current;
      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }

    // await TrackPlayer.load(track);
    // const currentTrackIndex
    // if (!playing) TrackPlayer.play();
    // else if (track.url === activeTrack?.url) TrackPlayer.pause();
  };

  const handlePlayAll = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();

    setActiveQueueId(queueId);
  };

  const handleShufflePlayAll = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.setQueue([...tracks].sort(() => Math.random() - 0.5));

    setActiveQueueId(queueId);
  };

  return (
    <FlatList
      data={tracks}
      ItemSeparatorComponent={() => (
        <View
          style={{
            padding: 8,
          }}
        ></View>
      )}
      ListFooterComponent={() => (
        <View
          style={{
            padding: 60,
          }}
        ></View>
      )}
      ListHeaderComponent={() => (
        <View
          style={{
            paddingTop: 4,
            paddingBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 1,
          }}
        >
          <TouchableOpacity onPress={handlePlayAll}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                backgroundColor: "#DDDDDD38",
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name="play" size={22} color={colors.primary} />
              <Text style={{ fontWeight: "bold", color: colors.primary }}>
                Play
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShufflePlayAll}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                backgroundColor: "#DDDDDD38",
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name="shuffle" size={22} color={colors.primary} />
              <Text style={{ fontWeight: "bold", color: colors.primary }}>
                Shuffle
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              ...defaultStyles.container,
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text style={defaultStyles.text}>No Songs found!</Text>
            <Image
              source={{
                uri: unknownTrackImageUri,
              }}
              style={{
                height: 160,
                width: 160,
              }}
            />
          </View>
        );
      }}
      renderItem={({ item, index }) => {
        return (
          <TrackListItem
            index={index}
            item={item as any}
            key={index}
            onTrackSelected={handleTrackSelect}
          />
        );
      }}
      {...flatlistProps}
    />
  );
}
