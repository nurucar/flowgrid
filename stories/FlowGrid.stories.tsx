import type { Meta, StoryObj } from "@storybook/react";
import { FlowGrid } from "../src/FlowGrid";

const meta: Meta<typeof FlowGrid> = {
  title: "FlowGrid",
  component: FlowGrid,
  args: {
    rowCount: 10_000,
    estimateRowSize: 32,
    height: 400,
  },
  argTypes: {
    rowCount: { control: { type: "number" } },
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

type Story = StoryObj<typeof FlowGrid>;

export const Default: Story = {
  args: {
    getRow: (i: number) => (
      <div className="border-b border-zinc-100 px-3 py-2 font-mono text-sm text-zinc-800">
        index <span className="text-blue-600">{i}</span>
      </div>
    ),
  },
};
