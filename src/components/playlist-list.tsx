import { PlaylistListItem } from "@/components/playlist-list-item";
import { unknownTrackImageUri } from "@/constants/images";
import { Playlist } from "@/helper/types";
import { utilsStyles } from "@/styles";
import { Image } from "expo-image";
import { FlatList, FlatListProps, Text, View } from "react-native";

type PlaylistsListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }}
  />
);

export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: PlaylistsListProps) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No playlist found</Text>

          <Image
            source={{ uri: unknownTrackImageUri }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      data={playlists}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem
          playlist={playlist}
          onPress={() => handlePlaylistPress(playlist)}
        />
      )}
      {...flatListProps}
    />
  );
};
