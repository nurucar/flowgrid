import type { ReactNode } from "react";

export type FlowGridColumn<TData = unknown> = {
  key: string;
  header: ReactNode;
  accessor: (row: TData) => ReactNode;
  width?: number | string;
  cell?: (value: ReactNode, row: TData, index: number) => ReactNode;
};

export type FlowGridProps<TData = unknown> = {
  /** Test identifier for e2e and unit tests. */
  "data-testid"?: string;
  className?: string;
  /** Scroll area height: pixels (number) or a CSS size (e.g. `"60vh"`, `"20rem"`). */
  height?: number | string;
  estimateRowSize?: number;

  data: TData[];
  columns?: FlowGridColumn<TData>[];

  /** Used when `columns` is missing or empty. */
  renderRow?: (row: TData, index: number) => ReactNode;
};
