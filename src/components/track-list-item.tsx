import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
import { StopPropagation } from "./utils/stop-propagation";
import { TrackShortcutsMenu } from "./track-shortcut-menu";

type PropsType = {
  item: {
    url: string;
    title: string;
    artist: string;
    artwork: string | undefined;
    playlist: string[];
  };
  index: number;
  onTrackSelected: (track: Track) => void;
};

export default function TrackListItem({
  item,
  index,
  onTrackSelected,
}: PropsType) {
  const activeTrack = useActiveTrack();

  const isActive = activeTrack?.title == item.title;

  return (
    <TouchableHighlight
      disabled={isActive}
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
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 8,
            opacity: isActive ? 0.6 : 1,
          }}
          source={{
            uri: item.artwork ?? unknownTrackImageUri,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
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
                maxWidth: "90%",
                color: isActive ? colors.primary : colors.text,
                fontSize: fontSize.base,
              }}
            >
              {item.title}
            </Text>
            {item.artist && (
              <Text
                style={{
                  color: "#ddd",
                  fontSize: fontSize.sm,
                  opacity: isActive ? 0.6 : 1,
                }}
              >
                {item.artist}
              </Text>
            )}
          </View>

          <StopPropagation>
            <TrackShortcutsMenu track={item}>
              <MaterialIcons name="more-horiz" size={22} color="white" />
            </TrackShortcutsMenu>
          </StopPropagation>
        </View>
      </View>
    </TouchableHighlight>
  );
}
