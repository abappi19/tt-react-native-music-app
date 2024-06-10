import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking, View } from "react-native";

export default function Missing() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const url = await Linking.getInitialURL();
      if (url === "trackplayer://notification.click") {
        router.replace("/");
        router.push("/player");
      }
    })();
  }, []);
  return <View></View>;
}
