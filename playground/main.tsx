import { createRoot } from "react-dom/client";
import { FlowGrid } from "../src";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element not found");
}

createRoot(root).render(
  <div className="max-w-2xl space-y-4">
    <h1 className="text-xl font-semibold text-zinc-900">flowgrid</h1>
    <p className="text-sm text-zinc-600">
      Placeholder — wire your grid and columns here.
    </p>
    <FlowGrid
      height={800}
      data={Array.from({ length: 5_000 }, (_, i) => i)}
      estimateRowSize={36}
      renderRow={(row, i) => (
        <div className="border-b border-zinc-100 px-2 py-1.5 text-sm text-zinc-800">
          Row {i} (value {row})
        </div>
      )}
    />
  </div>,
);
