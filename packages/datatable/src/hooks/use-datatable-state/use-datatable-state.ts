"use client";

import { useMemo, useState } from "react";

export interface UseDatatableStateResult {
  page: number;
  setPage: (nextPage: number) => void;
}

export const useDatatableState = (): UseDatatableStateResult => {
  const [page, setPage] = useState(1);

  return useMemo(
    () => ({
      page,
      setPage: (nextPage: number) => {
        setPage(Math.max(1, nextPage));
      },
    }),
    [page]
  );
};
