import { useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FlowGridProps } from "./FlowGrid.types";
import { columnsToGridTemplate } from "./utils/columnsToGridTemplate";
import { FlowGridBody } from "./components/FlowGridBody";
import { FlowGridHeader } from "./components/FlowGridHeader";

/**
 * Virtualized list / grid:
 *
 * - **Column mode** (`columns` non-empty): fixed header row + scrollable body (see `components/FlowGridHeader`,
 *   `FlowGridBody`, `FlowGridVirtualRow`, `FlowGridCell`).
 * - **Custom row mode** (`renderRow` only): single scroll container; each row is whatever `renderRow` returns.
 *
 * TanStack Virtual drives row virtualization (`count = data.length`). `parentRef` attaches to the scroll root.
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
  const activeColumns = isColumnMode ? columns : null;

  if (!isColumnMode && !isCustomRowMode) {
    throw new Error("FlowGrid requires either `columns` or `renderRow`.");
  }

  const gridTemplateColumns = useMemo(
    () => (activeColumns ? columnsToGridTemplate(activeColumns) : undefined),
    [activeColumns],
  );

  /** Scroll root passed to TanStack Virtual (`getScrollElement`). */
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowSize,
    overscan: 8,
  });

  const containerStyle: CSSProperties | undefined =
    height != null ? { height } : undefined;
  const heightClassName = height == null ? "h-64" : "";

  // Custom row mode: scroll container wraps body directly (no header).
  if (!activeColumns) {
    return (
      <div
        ref={parentRef}
        className={`flowgrid ${heightClassName} w-full overflow-auto rounded border border-zinc-200 ${className}`}
        data-testid={dataTestId}
        style={containerStyle}
      >
        <FlowGridBody
          data={data}
          totalSize={virtualizer.getTotalSize()}
          virtualItems={virtualizer.getVirtualItems()}
          renderRow={renderRow}
        />
      </div>
    );
  }

  // Column mode: flex column — header fixed, inner div scrolls (`min-h-0` enables flex shrink).
  return (
    <div
      className={`flowgrid flex w-full flex-col overflow-hidden rounded border border-zinc-200 ${heightClassName} ${className}`}
      data-testid={dataTestId}
      style={containerStyle}
    >
      <FlowGridHeader
        columns={activeColumns}
        gridTemplateColumns={gridTemplateColumns}
      />

      <div ref={parentRef} className="min-h-0 flex-1 overflow-auto">
        <FlowGridBody
          data={data}
          totalSize={virtualizer.getTotalSize()}
          virtualItems={virtualizer.getVirtualItems()}
          columns={activeColumns}
          gridTemplateColumns={gridTemplateColumns}
        />
      </div>
    </div>
  );
}
