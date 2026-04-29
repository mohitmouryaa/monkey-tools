"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type SelectionContextValue = {
  selected: Set<string>;
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  setMany: (ids: string[], checked: boolean) => void;
  clear: () => void;
  count: number;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const ToolsSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const setMany = useCallback((ids: string[], checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        for (const id of ids) next.add(id);
      } else {
        for (const id of ids) next.delete(id);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);

  const isSelected = useCallback((id: string) => selected.has(id), [selected]);

  const value = useMemo<SelectionContextValue>(
    () => ({ selected, isSelected, toggle, setMany, clear, count: selected.size }),
    [selected, isSelected, toggle, setMany, clear],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};

export const useToolsSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useToolsSelection deve estar dentro de <ToolsSelectionProvider>");
  }
  return ctx;
};
