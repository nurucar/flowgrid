/**
 * Scrollable content area inner shell (parent owns `overflow-auto` + virtualizer ref).
 * The outer `height: totalSize` div creates scroll height; rows are absolutely positioned inside.
 */
import type { ReactNode } from "react";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { FlowGridColumn } from "../FlowGrid.types";
import { FlowGridVirtualRow } from "./FlowGridVirtualRow";

export type FlowGridBodyProps<TData> = {
  data: readonly TData[];
  /** Sum of virtual row sizes — drives scrollbar range. */
  totalSize: number;
  /** Current window of rows from TanStack Virtual (already measured / positioned). */
  virtualItems: VirtualItem[];
  columns?: readonly FlowGridColumn<TData>[];
  gridTemplateColumns?: string;
  renderRow?: (row: TData, index: number) => ReactNode;
};

export function FlowGridBody<TData>({
  data,
  totalSize,
  virtualItems,
  columns,
  gridTemplateColumns,
  renderRow,
}: FlowGridBodyProps<TData>) {
  return (
    // Spacer: must match virtualizer total height so translateY offsets stay correct.
    <div className="relative w-full" style={{ height: `${totalSize}px` }}>
      {virtualItems.map((virtualRow) => {
        const row = data[virtualRow.index]!;

        return (
          <FlowGridVirtualRow
            key={virtualRow.key}
            row={row}
            virtualRow={virtualRow}
            columns={columns}
            gridTemplateColumns={gridTemplateColumns}
            renderRow={renderRow}
          />
        );
      })}
    </div>
  );
}
