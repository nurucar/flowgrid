import { createRoot } from "react-dom/client";
import { FlowGrid } from "../src";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element not found");
}

type Row = { id: number; name: string };

const data: Row[] = Array.from({ length: 5_000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

createRoot(root).render(
  <div className="max-w-2xl space-y-4">
    <h1 className="text-xl font-semibold text-zinc-900">flowgrid</h1>
    <p className="text-sm text-zinc-600">
      Columns mode — swap{" "}
      <code className="rounded bg-zinc-100 px-1">renderRow</code> for full
      control when needed.
    </p>
    <FlowGrid
      height={800}
      data={data}
      estimateRowSize={36}
      columns={[
        {
          key: "id",
          header: "ID",
          accessor: (row) => row.id,
          width: 88,
        },
        {
          key: "name",
          header: "Name",
          accessor: (row) => row.name,
          cell: (value, row, index) => (
            <span className="text-zinc-800">
              #{index} — {String(value)} ({row.name})
            </span>
          ),
        },
      ]}
    />
  </div>,
);
