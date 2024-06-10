import ArtistTrackList from "@/components/artist-track-list";
import PlaylistTrackList from "@/components/playlist-track-list";
import TrackList from "@/components/track-list";
import { screenPadding } from "@/constants/tokens";
import { useArtists, usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ArtistDetailScreen = () => {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  const { playlists } = usePlaylists();

  const playlist = playlists.find((playlist) => playlist.name === playlistName);

  if (!playlist) {
    console.warn(`Playlist ${playlistName} not found!`);

    return <Redirect href={"/(tabs)/playlist"} />;
  }

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
          marginBottom: 54,
        }}
      >
        <PlaylistTrackList
          queueId={`playlist-${playlist.name}`}
          playlist={playlist}
        />
      </ScrollView>
    </View>
  );
};

export default ArtistDetailScreen;
