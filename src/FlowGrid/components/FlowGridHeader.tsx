import type { FlowGridColumn } from "../FlowGrid.types";

export type FlowGridHeaderProps<TData> = {
  columns: readonly FlowGridColumn<TData>[];
  gridTemplateColumns: string | undefined;
};

export function FlowGridHeader<TData>({
  columns,
  gridTemplateColumns,
}: FlowGridHeaderProps<TData>) {
  return (
    <div className="shrink-0 border-b border-zinc-200 bg-zinc-50">
      <FlowGridHeaderRow
        columns={columns}
        gridTemplateColumns={gridTemplateColumns}
      />
    </div>
  );
}

type FlowGridHeaderRowProps<TData> = {
  columns: readonly FlowGridColumn<TData>[];
  gridTemplateColumns: string | undefined;
};

function FlowGridHeaderRow<TData>({
  columns,
  gridTemplateColumns,
}: FlowGridHeaderRowProps<TData>) {
  return (
    <div
      className="grid text-sm font-medium text-zinc-700"
      style={{ gridTemplateColumns }}
      role="row"
    >
      {columns.map((column) => (
        <FlowGridHeaderCell key={column.key} column={column} />
      ))}
    </div>
  );
}

type FlowGridHeaderCellProps<TData> = {
  column: FlowGridColumn<TData>;
};

function FlowGridHeaderCell<TData>({ column }: FlowGridHeaderCellProps<TData>) {
  return (
    <div className="min-w-0 px-2 py-2" role="columnheader">
      {column.header}
    </div>
  );
}
