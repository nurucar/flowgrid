import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FlowGrid } from "./FlowGrid";

describe("FlowGrid", () => {
  it("mounts the scroll container and virtual list shell", () => {
    render(
      <FlowGrid
        data={Array.from({ length: 20 }, (_, i) => i)}
        renderRow={(_, index) => <span>Row {index}</span>}
        estimateRowSize={40}
      />,
    );
    const root = screen.getByTestId("flowgrid");
    expect(root).toBeInTheDocument();
  });
});
