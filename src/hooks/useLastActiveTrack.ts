import { useEffect, useState } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

export default function useLastActiveTrack() {
  const [lastActiveTrack, setLastActiveTrack] = useState<Track | null>(null);
  const activeTrack = useActiveTrack();

  useEffect(() => {
    if (!activeTrack) return;
    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
}
