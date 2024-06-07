import { DevSettings, FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "./track-list-item";
import TrackPlayer, {
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

export default function TrackList({
  tracks,
  ...flatlistProps
}: TrackListProps) {
  const { playing } = useIsPlaying();
  const activeTrack = useActiveTrack();

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    if (!playing) TrackPlayer.play();
    else if (track.url === activeTrack?.url) TrackPlayer.pause();
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
