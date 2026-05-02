import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FlowGridProps } from "./FlowGrid.types";
import { columnsToGridTemplate } from "./utils/columnsToGridTemplate";

/**
 * Virtualized list / grid:
 *
 * - **Column mode** (`columns` non-empty): fixed header row + scrollable body. Header and each
 *   virtual row share the same `grid-template-columns` so labels line up with cells.
 * - **Custom row mode** (`renderRow` only): single scroll container; each virtual row is whatever
 *   `renderRow` returns (full flexibility, no built-in header).
 *
 * TanStack Virtual drives row virtualization only (`count = data.length`). The scroll root is the
 * element passed to `getScrollElement()` via `parentRef`.
 */
export function FlowGrid<TData = unknown>(props: FlowGridProps<TData>) {
  const {
    data,
    columns,
    renderRow,
    estimateRowSize = 32,
    className = "",
    height,
    "data-testid": dataTestId = "flowgrid",
  } = props;

  const isColumnMode = Boolean(columns?.length);
  const isCustomRowMode = !isColumnMode && renderRow != null;
  /** Narrowed columns array in column mode; avoids repeating `columns!` downstream. */
  const activeColumns = isColumnMode ? columns : null;

  if (!isColumnMode && !isCustomRowMode) {
    throw new Error("FlowGrid requires either `columns` or `renderRow`.");
  }

  const gridTemplateColumns = useMemo(
    () => (activeColumns ? columnsToGridTemplate(activeColumns) : undefined),
    [activeColumns],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowSize,
    overscan: 8,
  });

  const containerStyle = height != null ? { height } : undefined;
  const heightClassName = height == null ? "h-64" : "";

  /** Inner spacer whose height equals total virtual scroll height; rows are absolutely positioned inside. */
  const scrollBody = (
    <div
      className="relative w-full"
      style={{ height: `${virtualizer.getTotalSize()}px` }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const row = data[virtualRow.index]!;

        if (activeColumns) {
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full"
              data-index={virtualRow.index}
              role="row"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div
                className="grid w-full border-b border-zinc-100 text-sm text-zinc-800"
                style={{ gridTemplateColumns }}
              >
                {activeColumns.map((column) => {
                  const value = column.accessor(row);
                  const content = column.cell
                    ? column.cell(value, row, virtualRow.index)
                    : value;

                  return (
                    <div
                      key={column.key}
                      className="min-w-0 px-2 py-1.5"
                      role="cell"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (isCustomRowMode) {
          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full"
              data-index={virtualRow.index}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {renderRow(row, virtualRow.index)}
            </div>
          );
        }

        return null;
      })}
    </div>
  );

  /** Custom rows: scroll container wraps everything (same pattern as a plain virtual list). */
  if (!activeColumns) {
    return (
      <div
        ref={parentRef}
        className={`flowgrid ${heightClassName} w-full overflow-auto rounded border border-zinc-200 ${className}`}
        data-testid={dataTestId}
        style={containerStyle}
      >
        {scrollBody}
      </div>
    );
  }

  /**
   * Column mode: outer flex column keeps header visible; only the second child scrolls.
   * `min-h-0` lets flex shrink so overflow-auto on the body actually clips and scrolls.
   */
  return (
    <div
      className={`flowgrid flex w-full flex-col overflow-hidden rounded border border-zinc-200 ${heightClassName} ${className}`}
      data-testid={dataTestId}
      style={containerStyle}
    >
      <div
        className="grid shrink-0 border-b border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-700"
        style={{ gridTemplateColumns }}
        role="row"
      >
        {activeColumns.map((column) => (
          <div
            key={column.key}
            className="min-w-0 px-2 py-2"
            role="columnheader"
          >
            {column.header}
          </div>
        ))}
      </div>

      <div ref={parentRef} className="min-h-0 flex-1 overflow-auto">
        {scrollBody}
      </div>
    </div>
  );
}
