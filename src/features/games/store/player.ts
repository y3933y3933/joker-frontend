import { create } from "zustand";

interface PlayerState {
  id: number | null;
  nickname: string;
  isHost: boolean;
  actions: PlayerActions;
}

interface PlayerActions {
  setPlayerID: (id: number) => void;
  setNickname: (nickname: string) => void;
  setIsHost: (isHost: boolean) => void;
}

const usePlayerStore = create<PlayerState>()((set) => ({
  id: null,
  nickname: "",
  isHost: false,
  actions: {
    setPlayerID: (id) => set({ id }),
    setNickname: (nickname) => set({ nickname }),
    setIsHost: (isHost) => set({ isHost }),
  },
}));

export const usePlayerID = () => usePlayerStore((state) => state.id);
export const useNickname = () => usePlayerStore((state) => state.nickname);
export const useIsHost = () => usePlayerStore((state) => state.isHost);

export const usePlayerActions = () => usePlayerStore((state) => state.actions);
