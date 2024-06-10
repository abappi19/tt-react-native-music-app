import { unknownAtristsImageUri } from "@/constants/images";
import { Artist } from "@/helper/types";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import { FlatList, FlatListProps, Text, View } from "react-native";
import ArtistListItem from "./artist-list-item";
import { Link, useRouter } from "expo-router";

export type TrackListProps = Partial<FlatListProps<unknown>> & {
  artists: Artist[];
};

export default function ArtistList({
  artists,
  ...flatlistProps
}: TrackListProps) {
  const router = useRouter();

  const handleArtistsSelected = (item: Artist) => {
    router.push(`/artists/${item.name}`);
  };

  return (
    <FlatList
      data={artists}
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
            <Text style={defaultStyles.text}>No Artists found!</Text>
            <Image
              source={{
                uri: unknownAtristsImageUri,
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
          <ArtistListItem
            index={index}
            item={item as Artist}
            key={index}
            onTrackSelected={handleArtistsSelected}
          />
        );
      }}
      {...flatlistProps}
    />
  );
}
