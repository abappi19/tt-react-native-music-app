import {create} from 'zustand';


const useCurrentMusicStore = create((set)=>{
  currentMusicIndex: -1,
  nextMusic: () => set((state) => ({ currentMusicIndex: state.currentMusicIndex + 1 })),
  removeAllBears: () => set({ currentMusicIndex: 0 }),

})