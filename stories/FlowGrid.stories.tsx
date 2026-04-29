import type { Meta, StoryObj } from "@storybook/react";
import { FlowGrid } from "../src/FlowGrid";
import type { FlowGridProps } from "../src/FlowGrid/FlowGrid.types";

type StoryRow = { id: number };

const meta: Meta<FlowGridProps<StoryRow>> = {
  title: "FlowGrid",
  component: FlowGrid,
  args: {
    data: Array.from({ length: 10_000 }, (_, i) => ({ id: i })),
    estimateRowSize: 32,
    height: 400,
  },
  argTypes: {
    data: { control: false },
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

export const Default: Story = {
  args: {
    renderRow: (row, index) => (
      <div className="border-b border-zinc-100 px-3 py-2 font-mono text-sm text-zinc-800">
        index <span className="text-blue-600">{index}</span>
        <span className="text-zinc-500"> (id {row.id})</span>
      </div>
    ),
  },
};
