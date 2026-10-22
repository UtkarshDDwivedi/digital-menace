"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ProfileMenuContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openProfileMenu: () => void;
  closeProfileMenu: () => void;
};

const ProfileMenuContext = createContext<ProfileMenuContextType | null>(null);

export function ProfileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openProfileMenu: () => setIsOpen(true),
        closeProfileMenu: () => setIsOpen(false),
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
}

export function useProfileMenu() {
  const context = useContext(ProfileMenuContext);
  if (!context) {
    throw new Error("useProfileMenu must be used within a ProfileMenuProvider");
  }
  return context;
}

