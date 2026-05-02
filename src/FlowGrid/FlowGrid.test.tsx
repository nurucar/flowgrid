import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowGrid } from "./FlowGrid";

describe("FlowGrid", () => {
  it("renders rows with renderRow", () => {
    render(
      <FlowGrid
        data={Array.from({ length: 20 }, (_, i) => i)}
        renderRow={(row, index) => (
          <span>
            Row {index}: {row}
          </span>
        )}
        estimateRowSize={40}
      />,
    );

    expect(screen.getByTestId("flowgrid")).toBeInTheDocument();
  });

  it("renders columns API with headers and cells", () => {
    render(
      <FlowGrid
        data={[
          { id: "a", name: "Alpha" },
          { id: "b", name: "Beta" },
        ]}
        estimateRowSize={40}
        columns={[
          {
            key: "id",
            header: "ID",
            accessor: (row) => row.id,
            width: 120,
          },
          {
            key: "name",
            header: "Name",
            accessor: (row) => row.name,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("flowgrid")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "ID" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
  });

  it("throws when neither columns nor renderRow is provided", () => {
    expect(() =>
      render(<FlowGrid data={[{ id: 1 }]} estimateRowSize={40} />),
    ).toThrow("FlowGrid requires either `columns` or `renderRow`.");
  });
});
