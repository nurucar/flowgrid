import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { FlowGridProps } from "./FlowGrid.types";

export function FlowGrid<TData = unknown>(props: FlowGridProps<TData>) {
  const {
    data,
    renderRow,
    estimateRowSize = 32,
    className = "",
    height,
    "data-testid": dataTestId = "flowgrid",
  } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowSize,
    overscan: 8,
  });

  return (
    <div
      ref={parentRef}
      className={`flowgrid ${height == null ? "h-64" : ""} w-full overflow-auto rounded border border-zinc-200 ${className}`}
      data-testid={dataTestId}
      style={height != null ? { height } : undefined}
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((v) => (
          <div
            key={v.key}
            className="absolute top-0 left-0 w-full"
            data-index={v.index}
            style={{ transform: `translateY(${v.start}px)` }}
          >
            {renderRow(data[v.index], v.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
