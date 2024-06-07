import { TrackWithPlaylist } from "@/helper/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

import library from "@/assets/data/library.json";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlaylist: (track: Track, playlistName: string) => void;
}

const useLibraryStore = create<LibraryState>((set) => {
  return {
    tracks: library,
    addToPlaylist(track, playlistName) {
      return set((state) => ({
        tracks: state.tracks.map((currentTrack) => {
          if (currentTrack.url === track.url) {
            return {
              ...currentTrack,
              playlist: [...(currentTrack.playlist || []), playlistName],
            };
          }
          return currentTrack;
        }),
      }));
    },
    toggleTrackFavorite(track) {
      return set((state) => ({
        tracks: state.tracks.map((currentItem) => {
          if (currentItem.url === track.url) {
            return {
              ...currentItem,
              rating: currentItem.rating === 1 ? 0 : 1,
            };
          }

          return currentItem;
        }),
      }));
    },
  };
});

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
  const favorites = useLibraryStore((state) =>
    state.tracks.filter((track) => track.rating === 1)
  );
  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return {
    favorites,
    toggleTrackFavorite,
  };
};
