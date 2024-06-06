import CollapsedPlayerView from "@/components/collapsed-player-view";
import TrackList from "@/components/track-list";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { ScrollView, Text, View } from "react-native";


export default function Index() {
  return (
    <View
    style={defaultStyles.container}
    >
      <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      style={{paddingHorizontal:screenPadding.horizontal, marginBottom:24}}>
        <TrackList/>
      </ScrollView>
      
      <CollapsedPlayerView/>

    </View>
  );
}
