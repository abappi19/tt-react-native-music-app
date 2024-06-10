import { Artist, Playlist, TrackWithPlaylist } from "@/helper/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

import library from "@/assets/data/library.json";
import { unknownTrackImageUri } from "@/constants/images";

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


export const useArtists = () =>
	useLibraryStore((state) => {
		return state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})


  export const usePlaylists = () => {
    const playlists = useLibraryStore((state) => {
      return state.tracks.reduce((acc, track) => {
        track.playlist?.forEach((playlistName) => {
          const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
  
          if (existingPlaylist) {
            existingPlaylist.tracks.push(track)
          } else {
            acc.push({
              name: playlistName,
              tracks: [track],
              artworkPreview: track.artwork ?? unknownTrackImageUri,
            })
          }
        })
  
        return acc
      }, [] as Playlist[])
    })
  
    const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)
  
    return { playlists, addToPlaylist }
  }
  