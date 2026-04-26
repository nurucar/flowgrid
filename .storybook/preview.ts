import type { Preview } from "@storybook/react";
import "../src/styles/flowgrid.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

export default preview;
