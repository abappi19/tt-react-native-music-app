import FloatingMusicPlayer from "@/components/floating-music-player";
import { colors, fontSize } from "@/constants/tokens";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveBackgroundColor:'#000',
          // tabBarInactiveBackgroundColor:'#333',
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,

          tabBarBackground() {
            return (
              <BlurView
                intensity={95}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: "hidden",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
            );
          },
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 8,
          },
        }}
      >
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            headerShown: false,
            tabBarIcon(props) {
              return <FontAwesome name="heart" size={20} color={props.color} />;
            },
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: "Playlist",
            headerShown: false,
            tabBarIcon(props) {
              return (
                <MaterialCommunityIcons
                  name="playlist-play"
                  size={20}
                  color={props.color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            headerShown: false,
            tabBarIcon(props) {
              return (
                <Ionicons
                  name="musical-note-sharp"
                  size={24}
                  color={props.color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            headerShown: false,
            tabBarIcon(props) {
              return (
                <Ionicons name="people-circle" size={20} color={props.color} />
              );
            },
          }}
        />
      </Tabs>

      <FloatingMusicPlayer />
    </>
  );
}
