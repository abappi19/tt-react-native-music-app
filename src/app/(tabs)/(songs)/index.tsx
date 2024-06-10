// import library from "@/assets/data/library.json";
import SearchInput from "@/components/search-input";
import TrackList from "@/components/track-list";
import { screenPadding } from "@/constants/tokens";
import { useTracks } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const tracks = useTracks();

  const filteredLibray = useMemo(() => {
    if (!searchQuery) return tracks;

    const msearch = searchQuery.toLowerCase().trim();

    return tracks.filter((item) =>
      item.title?.toLowerCase().trim().includes(msearch)
    );
  }, [searchQuery, tracks]);

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
