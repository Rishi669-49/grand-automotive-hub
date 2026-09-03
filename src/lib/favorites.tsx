import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "aurelia-favorites";

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  ready: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((x) => typeof x === "string"));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* storage unavailable */
    }
  }, [favorites, ready]);

  const toggleFavorite = useCallback((id: string) => {
    let added = false;
    setFavorites((prev) => {
      if (prev.includes(id)) {
        added = false;
        return prev.filter((x) => x !== id);
      }
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      ready,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite,
      clearFavorites: () => setFavorites([]),
    }),
    [favorites, ready, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
