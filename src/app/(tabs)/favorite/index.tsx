// import library from "@/assets/data/library.json";
import SearchInput from "@/components/search-input";
import TrackList from "@/components/track-list";
import { screenPadding } from "@/constants/tokens";
import { useFavorites, useTracks } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function FavoriteScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const { favorites } = useFavorites();

  const filteredLibray = useMemo(() => {
    if (!searchQuery) return favorites;

    const msearch = searchQuery.toLowerCase().trim();

    return favorites.filter((item) =>
      item.title?.toLowerCase().trim().includes(msearch)
    );
  }, [searchQuery, favorites]);

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
            placeholder="Find in Songs"
            onSearch={setSearchQuery}
          />

          <TrackList
            queueId="songs"
            tracks={filteredLibray}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* <CollapsedPlayerView/> */}
    </View>
  );
}
