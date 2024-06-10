import { StackScreenWithSearchBar } from "@/constants/layout";
import { playbackService } from "@/constants/playback-service";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Linking, LogBox } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

try {
  TrackPlayer.registerPlaybackService(() => playbackService);
} catch (e) {}

const App = () => {
  const router = useRouter();
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  // useLogTrackPlayerState();

  useEffect(() => {
    const handleDeepLink = (event: { url: string | null }) => {
      const url = event.url;
      if (url === null) return;

      if (url === "trackplayer://notification.click") {
        router.replace("/");
        router.push("/player");

        // Add your custom logic to handle the notification click
      }
    };

    // Listen for deep links while the app is open
    Linking.addEventListener("url", handleDeepLink);

    // Handle the case where the app is opened with a deep link
    Linking.getInitialURL().then((url) => {
      handleDeepLink({ url });
    });

    return () => {
      // Clean up the event listener
      Linking.removeAllListeners("url");
    };
  }, []);

  /** not required */

  // if (!isReady) {
  //   return (
  //     <View
  //       style={[
  //         defaultStyles.container,
  //         { alignItems: "center", justifyContent: "center" },
  //       ]}
  //     >
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  /** // not required */

  return (
    // <NavigationContainer>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayout />

        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
    // </NavigationContainer>
  );
};

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
        }}
      />

      <Stack.Screen
        name="[...missing]"
        options={{
          ...StackScreenWithSearchBar,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default App;
