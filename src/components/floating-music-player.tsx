import library from "@/assets/data/library.json";
import { fontSize } from "@/constants/tokens";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import NextButton from "./floating-music-player/next-button";
import PlayPauseButton from "./floating-music-player/play-pause-button";
import { unknownTrackImageUri } from "@/constants/images";

export default function FloatingMusicPlayer() {
  let activeTrack = useActiveTrack();

//   activeTrack = library[1];


  if (!activeTrack) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        padding: 8,
        borderWidth: 1,
        borderColor: "#80808065",
        borderRadius: 16,
      }}
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
          }}
          source={{
            uri: activeTrack.artwork ?? unknownTrackImageUri,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
            gap: 8,

            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: fontSize.sm,
                // maxWidth: "90%",
              }}
            >
              {activeTrack?.title}
            </Text>

            {/* <Text style={{ color: "#ddd", fontSize: fontSize.sm }}>
              {activeTrack?.artist}
            </Text> */}
          </View>

          <PlayPauseButton />
          <NextButton />
        </View>
      </View>
    </View>
  );
}
