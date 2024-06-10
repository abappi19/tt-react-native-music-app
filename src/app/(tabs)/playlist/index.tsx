import { PlaylistsList } from "@/components/playlist-list";
import SearchInput from "@/components/search-input";
import { screenPadding } from "@/constants/tokens";
import { Playlist } from "@/helper/types";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

const PlaylistsScreen = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    if (!searchQuery) return playlists;

    const msearch = searchQuery.toLowerCase().trim();

    return playlists.filter((val: Playlist) =>
      val.name.toLowerCase().trim().includes(msearch)
    );
  }, [playlists, searchQuery]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push(`/playlist/${playlist.name}`);
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <View>
          <SearchInput
            searchOnChange
            placeholder="Find in Favorites"
            onSearch={setSearchQuery}
          />
          <PlaylistsList
            scrollEnabled={false}
            playlists={filteredPlaylists}
            onPlaylistPress={handlePlaylistPress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistsScreen;
