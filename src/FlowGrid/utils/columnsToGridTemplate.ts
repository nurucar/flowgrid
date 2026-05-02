import type { FlowGridColumn } from "../FlowGrid.types";

/**
 * CSS grid track used when a column has no explicit width.
 * minmax(0, 1fr) lets the column shrink below intrinsic content width (needed for truncation)
 * while sharing leftover space evenly with other fr tracks.
 */
const DEFAULT_COLUMN_WIDTH = "minmax(0, 1fr)";

/**
 * Turns a FlowGridColumn.width into a single grid-template-columns track string.
 *
 * - undefined → flexible column ({@link DEFAULT_COLUMN_WIDTH})
 * - number → `${n}px` (must be finite and ≥ 0)
 * - string → passed through (e.g. "200px", "minmax(120px, 1fr)", "10rem")
 */
function columnWidthToGridTrack<TData>(column: FlowGridColumn<TData>): string {
  const { width } = column;

  if (width == null) {
    return DEFAULT_COLUMN_WIDTH;
  }

  if (typeof width === "number") {
    if (!Number.isFinite(width) || width < 0) {
      throw new Error(
        "FlowGrid column width must be a finite non-negative number.",
      );
    }

    return `${width}px`;
  }

  return width;
}

/**
 * Builds the value for CSS `grid-template-columns` so header cells and body cells stay aligned.
 * Tracks appear in column definition order; combine with the same grid on header + rows.
 */
export function columnsToGridTemplate<TData>(
  columns: readonly FlowGridColumn<TData>[],
): string {
  return columns.map((column) => columnWidthToGridTrack(column)).join(" ");
}
