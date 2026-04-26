import type { Meta, StoryObj } from "@storybook/react";
import { FlowGrid } from "../src/FlowGrid";

const meta: Meta<typeof FlowGrid> = {
  title: "FlowGrid",
  component: FlowGrid,
  args: {
    rowCount: 10_000,
    estimateRowSize: 32,
  },
  argTypes: {
    rowCount: { control: { type: "number" } },
    estimateRowSize: { control: { type: "number" } },
  },
};

export default meta;

type Story = StoryObj<typeof FlowGrid>;

export const Default: Story = {
  args: {
    getRow: (i: number) => (
      <div className="px-2 py-1 font-mono text-sm text-zinc-800">
        index <span className="text-blue-600">{i}</span>
      </div>
    ),
  },
};
