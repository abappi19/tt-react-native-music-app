import { playbackService } from "@/constants/playback-service";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

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
    </Stack>
  );
};

export default App;
