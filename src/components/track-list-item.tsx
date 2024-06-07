import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TouchableHighlight, View } from "react-native";
import LoaderKit from "react-native-loader-kit";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { TrackShortcutsMenu } from "./track-shortcut-menu";
import { StopPropagation } from "./utils/stop-propagation";

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
  const { playing } = useIsPlaying();

  const isActive = activeTrack?.title == item.title;

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
              opacity: isActive ? 0.6 : 1,
            }}
            source={{
              uri: item.artwork ?? unknownTrackImageUri,
            }}
          />
          {isActive &&
            (playing ? (
              <LoaderKit
                style={{
                  width: 30,
                  height: 30,

                  position: "absolute",
                  top: 10,
                  left: 10,
                }}
                name={"LineScaleParty"} // Optional: see list of animations below
                color={"white"}
              />
            ) : (
              <Ionicons
                name="play"
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                }}
                size={26}
                color={colors.icon}
              />
            ))}
        </View>
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
