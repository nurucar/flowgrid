/**
 * Single body cell in column mode. Runs `accessor` for the raw value, then optional `cell`
 * to wrap or replace presentation (sorting/formatting hooks can live there later).
 */
import type { FlowGridColumn } from "../FlowGrid.types";

export type FlowGridCellProps<TData> = {
  column: FlowGridColumn<TData>;
  row: TData;
  rowIndex: number;
};

export function FlowGridCell<TData>({
  column,
  row,
  rowIndex,
}: FlowGridCellProps<TData>) {
  const value = column.accessor(row);
  const content = column.cell ? column.cell(value, row, rowIndex) : value;

  return (
    <div className="min-w-0 px-2 py-1.5" role="cell">
      {content}
    </div>
  );
}
