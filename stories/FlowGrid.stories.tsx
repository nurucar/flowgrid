import type { Meta, StoryObj } from "@storybook/react";
import { FlowGrid } from "../src/FlowGrid";
import type { FlowGridProps } from "../src/FlowGrid/FlowGrid.types";

type StoryRow = { id: number; label: string };

const meta: Meta<FlowGridProps<StoryRow>> = {
  title: "FlowGrid",
  component: FlowGrid,
  args: {
    data: Array.from({ length: 10_000 }, (_, i) => ({
      id: i,
      label: `Row ${i}`,
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

export const WithRenderRow: Story = {
  name: "renderRow",
  args: {
    renderRow: (row, index) => (
      <div className="border-b border-zinc-100 px-3 py-2 font-mono text-sm text-zinc-800">
        index <span className="text-blue-600">{index}</span>
        <span className="text-zinc-500"> ({row.label})</span>
      </div>
    ),
  },
};

export const ColumnsApi: Story = {
  name: "columnsApi",
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
        cell: (value) => (
          <span className="font-medium text-zinc-900">{value}</span>
        ),
      },
    ],
  },
};

export const ColumnWidths: Story = {
  name: "column widths",
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
