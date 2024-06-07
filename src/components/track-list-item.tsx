import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { Image } from "expo-image";
import { Text, TouchableHighlight, View } from "react-native";
import { Track } from "react-native-track-player";

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
  const isActive = false;

  return (
    <TouchableHighlight
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
          <View>
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
              {" "}
              {item.title}{" "}
            </Text>
            {item.artist && (
              <Text style={{ color: "#ddd", fontSize: fontSize.sm }}>
                {" "}
                {item.artist}{" "}
              </Text>
            )}
          </View>

          {/* <TouchableOpacity>
                           <Ionicons name='heart' size={22} color="white"/>
                       </TouchableOpacity> */}
        </View>
      </View>
    </TouchableHighlight>
  );
}
