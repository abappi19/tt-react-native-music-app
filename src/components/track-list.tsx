import songData from "@/assets/data/library.json";
import { FlatList, FlatListProps, View } from "react-native";
import TrackListItem from "./track-list-item";

export type TrackListProps = Partial<FlatListProps<unknown>>;

export default function TrackList({ ...flatlistProps }: TrackListProps) {
  return (
    <FlatList
      data={songData}
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
            padding: 8,
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
      renderItem={({ item, index }) => {
        return <TrackListItem index={index} item={item as any} key={index} />;
      }}
      {...flatlistProps}
    />
  );
}
