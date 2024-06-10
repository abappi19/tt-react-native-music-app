// import library from "@/assets/data/library.json";
import ArtistList from "@/components/artist-list";
import SearchInput from "@/components/search-input";
import TrackList from "@/components/track-list";
import { screenPadding } from "@/constants/tokens";
import { useArtists, useFavorites, useTracks } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function ArtistsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!searchQuery) return artists;

    const msearch = searchQuery.toLowerCase().trim();

    return artists.filter((item) =>
      item.name?.toLowerCase().trim().includes(msearch)
    );
  }, [searchQuery, artists]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
          marginBottom: 54,
        }}
      >
        <View>
          <SearchInput
            searchOnChange
            placeholder="Find in Artists"
            onSearch={setSearchQuery}
          />

          <ArtistList
            queueId="songs"
            artists={filteredArtists}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* <CollapsedPlayerView/> */}
    </View>
  );
}
