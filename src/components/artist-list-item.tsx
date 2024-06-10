import {
  unknownAtristsImageUri,
  unknownTrackImageUri,
} from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TouchableHighlight, View } from "react-native";
import LoaderKit from "react-native-loader-kit";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { TrackShortcutsMenu } from "./track-shortcut-menu";
import { StopPropagation } from "./utils/stop-propagation";
import { Artist } from "@/helper/types";

type PropsType = {
  item: Artist;
  index: number;
  onTrackSelected: (artist: Artist) => void;
};

export default function ArtistListItem({
  item,
  index,
  onTrackSelected,
}: PropsType) {
  // const activeTrack = useActiveTrack();
  // const { playing } = useIsPlaying();

  return (
    
    <TouchableHighlight
      //   disabled={isActive}
      onPress={() => {
        onTrackSelected(item);
      }}
      key={index}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 8,
            }}
            source={{
              uri: unknownAtristsImageUri,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              paddingHorizontal: 8,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontWeight: "bold",
                maxWidth: "100%",
                color: colors.text,
                fontSize: fontSize.base,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
