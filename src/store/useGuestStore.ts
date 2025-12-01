// store/guestStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GuestStore {
  guestId: string | null;
  setGuestId: (id: string) => void;
}

export const useGuestStore = create<GuestStore>()(
  persist(
    (set) => ({
      guestId: null,
      setGuestId: (id: string) => set({ guestId: id }),
    }),
    {
      name: "guest-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ guestId: state.guestId }), 
    }
  )
);
