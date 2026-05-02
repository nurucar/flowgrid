import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowGrid } from "./FlowGrid";

describe("FlowGrid", () => {
  it("mounts with renderRow", () => {
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

  it("renders column headers", () => {
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
          },
          {
            key: "name",
            header: "Name",
            accessor: (row) => row.name,
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "ID" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
  });

  it("throws without columns or renderRow", () => {
    expect(() =>
      render(<FlowGrid data={[{ id: 1 }]} estimateRowSize={40} />),
    ).toThrow("FlowGrid requires either `columns` or `renderRow`.");
  });

  it("accepts column width config without crashing", () => {
    render(
      <FlowGrid
        data={[{ id: 1, label: "row-a", status: "ok" }]}
        estimateRowSize={40}
        columns={[
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
            accessor: (row) => row.status,
            width: 120,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("flowgrid")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "ID" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Flexible Label" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Status" }),
    ).toBeInTheDocument();
  });
});
