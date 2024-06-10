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
    // const currentTrackIndex
    
    
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
            paddingTop: 4,
            paddingBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 1,
          }}
        >
          <TouchableOpacity>
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

          <TouchableOpacity>
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
