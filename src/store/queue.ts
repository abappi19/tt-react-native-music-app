import { create } from "zustand";

type QueueStore = {
  activeQueueId: string | null;
  setActiveQueueId: (id: string) => void;
};

const useQueStore = create<QueueStore>((set) => {
  return {
    activeQueueId: null,
    setActiveQueueId(id) {
      set({ activeQueueId: id });
    },
  };
});

export function useQueue() {
  return useQueStore((state) => state);
}
