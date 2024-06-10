import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackVolume = () => {
  const [volume, setVolume] = useState<number>(0);

  const updateVolume = async (newVolume: number) => {
    if (newVolume > 1 || newVolume < 0) return;

    setVolume(newVolume);

    await TrackPlayer.setVolume(newVolume);
  };

  useEffect(() => {
    TrackPlayer.getVolume().then((val) => {
      setVolume(val);
    });
  }, []);

  return {
    volume,
    updateVolume,
  };
};
