import type { Meta, StoryObj } from "@storybook/react";
import { FlowGrid } from "../src/FlowGrid";
import type { FlowGridProps } from "../src/FlowGrid/FlowGrid.types";

/** Shared fixture; extra fields stay unused in focused stories. */
type StoryRow = {
  id: number;
  label: string;
  tier: "pro" | "free";
};

const meta: Meta<FlowGridProps<StoryRow>> = {
  title: "FlowGrid",
  component: FlowGrid,
  args: {
    data: Array.from({ length: 10_000 }, (_, i) => ({
      id: i,
      label: `Row ${i}`,
      tier: i % 5 === 0 ? ("pro" as const) : ("free" as const),
    })),
    estimateRowSize: 32,
    height: 400,
  },
  argTypes: {
    data: { control: false },
    columns: {
      control: false,
      name: "columnsApi",
      description:
        "Declarative columns (`FlowGridColumn[]`). Prefer `renderRow` when you need full row layout control.",
    },
    renderRow: { control: false },
    estimateRowSize: { control: { type: "number" } },
    height: { control: { type: "number" } },
  },
  render: (args) => (
    <div className="max-w-4xl p-6">
      <FlowGrid {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<FlowGridProps<StoryRow>>;

/** Custom row renderer only — no `columns`. */
export const RenderRow: Story = {
  name: "renderRow",
  parameters: {
    docs: {
      description: {
        story:
          "Uses only `renderRow`. Each virtual row is whatever you return — full layout freedom.",
      },
    },
  },
  args: {
    renderRow: (row, index) => (
      <div className="border-b border-zinc-100 px-3 py-2 font-mono text-sm text-zinc-800">
        index <span className="text-blue-600">{index}</span>
        <span className="text-zinc-500"> ({row.label})</span>
      </div>
    ),
  },
};

/** Minimal columns API: header + accessor only (no `cell` overrides). */
export const ColumnsApi: Story = {
  name: "columns API",
  parameters: {
    docs: {
      description: {
        story:
          "Declarative columns with plain `accessor` output — baseline table mapping.",
      },
    },
  },
  args: {
    columns: [
      {
        key: "id",
        header: "ID",
        accessor: (row) => row.id,
        width: 96,
      },
      {
        key: "label",
        header: "Label",
        accessor: (row) => row.label,
      },
    ],
  },
};

/** Fixed / flexible / fixed column tracks (`width` → grid template). */
export const ColumnWidths: Story = {
  name: "column widths",
  parameters: {
    docs: {
      description: {
        story:
          "80px fixed ID, flexible middle column, 120px fixed trailing column.",
      },
    },
  },
  args: {
    columns: [
      {
        key: "id",
        header: "ID",
        accessor: (row) => row.id,
        width: 80,
      },
      {
        key: "label",
        header: "Flexible Label",
        accessor: (row) => row.label,
      },
      {
        key: "status",
        header: "Status",
        accessor: () => "Active",
        width: 120,
      },
    ],
  },
};

/** `cell` overrides: typography + badge-style chips per column. */
export const CustomCell: Story = {
  name: "custom cell",
  parameters: {
    docs: {
      description: {
        story:
          "Uses `column.cell` to wrap accessor values — bold label + tier badge.",
      },
    },
  },
  args: {
    columns: [
      {
        key: "id",
        header: "ID",
        accessor: (row) => row.id,
        width: 72,
      },
      {
        key: "label",
        header: "Name",
        accessor: (row) => row.label,
        cell: (value) => (
          <span className="font-semibold text-zinc-900">{value}</span>
        ),
      },
      {
        key: "tier",
        header: "Tier",
        accessor: (row) => row.tier,
        cell: (value) => (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              value === "pro"
                ? "bg-violet-100 text-violet-800"
                : "bg-zinc-100 text-zinc-700"
            }`}
          >
            {String(value)}
          </span>
        ),
      },
    ],
  },
};
