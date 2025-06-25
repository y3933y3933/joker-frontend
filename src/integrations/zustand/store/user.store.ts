import type { UserRole } from "@/types";
import { create } from "zustand";

interface UserState {
  id: number | null;
  nickname: string;
  isHost: boolean;
  actions: UserActions;
  role: UserRole;
}

interface UserActions {
  setUserID: (id: number) => void;
  setUserNickname: (name: string) => void;
  setIsHost: (isHost: boolean) => void;
  setUserRoleAnswer: () => void;
  setUserRoleNormal: () => void;
  setUserRoleQuestion: () => void;

  reset: () => void;
}

const useUserStore = create<UserState>((set) => ({
  id: null,
  nickname: "",
  role: "normal",
  isHost: false,
  actions: {
    setUserID: (id: number) => {
      set({ id });
    },
    setUserNickname: (name: string) => {
      set({ nickname: name });
    },
    setIsHost: (isHost: boolean) => {
      set({ isHost });
    },
    setUserRoleAnswer: () => {
      set({ role: "answer" });
    },
    setUserRoleNormal: () => {
      set({ role: "normal" });
    },
    setUserRoleQuestion: () => {
      set({ role: "question" });
    },
    reset: () => {
      set({ nickname: "", id: null, role: "normal" });
    },
  },
}));

export const useUserID = () => useUserStore((state) => state.id);
export const useUserNickname = () => useUserStore((state) => state.nickname);
export const useUserIsHost = () => useUserStore((state) => state.isHost);
export const useUserRole = () => useUserStore((state) => state.role);

export const useUserActions = () => useUserStore((state) => state.actions);
