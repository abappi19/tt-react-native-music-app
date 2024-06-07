import { DevSettings, FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "./track-list-item";
import TrackPlayer, { Track, useIsPlaying } from "react-native-track-player";
import { defaultStyles } from "@/styles";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

export default function TrackList({
  tracks,
  ...flatlistProps
}: TrackListProps) {
  const { playing } = useIsPlaying();

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    if (!playing) TrackPlayer.play();
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
            padding: 8,
          }}
        ></View>
      )}
      ListHeaderComponent={() => (
        <View
          style={{
            padding: 8,
          }}
        ></View>
      )}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              ...defaultStyles.container,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={defaultStyles.text}>No Songs found!</Text>
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
