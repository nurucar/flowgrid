import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FlowGrid } from "./FlowGrid";

describe("FlowGrid", () => {
  it("mounts the scroll container and virtual list shell", () => {
    render(
      <FlowGrid
        rowCount={20}
        getRow={(i) => <span>Row {i}</span>}
        estimateRowSize={40}
      />,
    );
    const root = screen.getByTestId("flowgrid");
    expect(root).toBeInTheDocument();
  });
});
