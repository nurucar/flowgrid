import type { ReactNode } from "react";

export type FlowGridProps<TData = unknown> = {
  /** Test identifier for e2e and unit tests. */
  "data-testid"?: string;
  className?: string;
  /** Scroll area height: pixels (number) or a CSS size (e.g. `"60vh"`, `"20rem"`). */
  height?: number | string;
  estimateRowSize?: number;

  data: TData[];
  renderRow: (row: TData, index: number) => ReactNode;
};
