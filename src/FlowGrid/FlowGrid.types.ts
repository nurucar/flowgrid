import type { ReactNode } from "react";

export type FlowGridProps = {
  /** Test identifier for e2e and unit tests. */
  "data-testid"?: string;
  className?: string;
  /** Scroll area height: pixels (number) or a CSS size (e.g. `"60vh"`, `"20rem"`). */
  height?: number | string;
  rowCount: number;
  getRow: (index: number) => ReactNode;
  estimateRowSize?: number;
};
