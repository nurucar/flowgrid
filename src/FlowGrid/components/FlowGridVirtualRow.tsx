/**
 * One visible data row from the virtualizer. Positioned with `translateY(virtualRow.start)`.
 *
 * - **No `columns`:** free-form content from `renderRow` (custom row mode).
 * - **With `columns`:** CSS grid row + `FlowGridCell` per column (same template as header).
 */
import type { ReactNode } from "react";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { FlowGridColumn } from "../FlowGrid.types";
import { FlowGridCell } from "./FlowGridCell";

export type FlowGridVirtualRowProps<TData> = {
  row: TData;
  virtualRow: VirtualItem;
  columns?: readonly FlowGridColumn<TData>[];
  gridTemplateColumns?: string;
  renderRow?: (row: TData, index: number) => ReactNode;
};

export function FlowGridVirtualRow<TData>({
  row,
  virtualRow,
  columns,
  gridTemplateColumns,
  renderRow,
}: FlowGridVirtualRowProps<TData>) {
  if (!columns) {
    if (!renderRow) {
      return null;
    }

    return (
      <div
        className="absolute top-0 left-0 w-full"
        data-index={virtualRow.index}
        style={{ transform: `translateY(${virtualRow.start}px)` }}
      >
        {renderRow(row, virtualRow.index)}
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 left-0 w-full"
      data-index={virtualRow.index}
      role="row"
      style={{ transform: `translateY(${virtualRow.start}px)` }}
    >
      <div
        className="grid w-full border-b border-zinc-100 text-sm text-zinc-800"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <FlowGridCell
            key={column.key}
            column={column}
            row={row}
            rowIndex={virtualRow.index}
          />
        ))}
      </div>
    </div>
  );
}
