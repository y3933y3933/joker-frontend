import { create } from "zustand";

interface AdminStore {
  userID: number | null;
  username: string;
  actions: AdminActions;
}

interface AdminActions {
  setUserID: (id: number) => void;
  setUsername: (username: string) => void;
  reset: () => void;
}

const useAdminStore = create<AdminStore>((set) => ({
  userID: null,
  username: "",
  isAuthenticated: false,
  actions: {
    setUserID: (id: number) => {
      set({ userID: id });
    },
    setUsername: (username: string) => {
      set({ username });
    },

    reset: () => {
      set({
        userID: null,
        username: "",
      });
    },
  },
}));

export const useAdminUserID = () => useAdminStore((state) => state.userID);
export const useAdminUsername = () => useAdminStore((state) => state.username);

export const useAdminActions = () => useAdminStore((state) => state.actions);
