import { FlatList, FlatListProps, View } from "react-native";
import TrackListItem from "./track-list-item";
import TrackPlayer, { Track } from "react-native-track-player";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

export default function TrackList({
  tracks,
  ...flatlistProps
}: TrackListProps) {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
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
