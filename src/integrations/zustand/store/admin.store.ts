import { create } from "zustand";

interface AdminStore {
  userID: number | null;
  username: string;
  isAuthenticated: boolean;
  actions: AdminActions;
}

interface AdminActions {
  setUserID: (id: number) => void;
  setUsername: (username: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
    setIsAuthenticated: (isAuthenticated: boolean) => {
      set({ isAuthenticated });
    },
    reset: () => {
      set({
        userID: null,
        username: "",
        isAuthenticated: false,
      });
    },
  },
}));

export const useAdminUserID = () => useAdminStore((state) => state.userID);
export const useAdminUsername = () => useAdminStore((state) => state.username);
export const useAdminIsAuthenticated = () =>
  useAdminStore((state) => state.isAuthenticated);
export const useAdminActions = () => useAdminStore((state) => state.actions);
