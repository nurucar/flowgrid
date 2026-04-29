# FlowGrid

Headless, continuous-data-first virtual list for React — evolving into a full data grid.

Efficiently render large datasets using virtualization instead of pagination.

---

## Status

🚧 In active development — virtualized list foundation complete.  
🔜 Next: `columns` API for data-driven table rendering.

---

## Why FlowGrid?

Traditional tables often rely on pagination or large DOM rendering, which can negatively impact performance and user experience.

FlowGrid takes a different approach:

- Renders only visible rows (powered by TanStack Virtual)
- Headless — you own every pixel of markup and style
- Avoids pagination as a primary navigation model
- Evolving from a high-performance list into a full-featured data grid

---

## What FlowGrid Is Today

**A headless virtual list with complete row-level control.**

You bring the data and the row template. FlowGrid handles scroll performance.

---

## Example (Current API)

```tsx
import { FlowGrid } from "flowgrid";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  // ... thousands more
];

function UserList() {
  return (
    <FlowGrid
      data={users}
      height={400}
      estimateRowSize={40}
      renderRow={(user, index) => (
        <div className="grid grid-cols-2 border-b px-3 py-2">
          <span>{user.name}</span>
          <span className="text-zinc-500">{user.email}</span>
        </div>
      )}
    />
  );
}
```

> **Note:**  
> Today, FlowGrid gives you full control over each row. You define the layout and structure.  
> There is no built-in `<table>` yet — that's coming with the columns API.

---

## Advanced API (Planned)

Support for low-level row access (`rowCount + getRow`) will be added  
for server-side and lazy-loaded data scenarios.

---

## What's Coming Next

### 🔜 columns API (Next Feature)

The current `renderRow` approach gives maximum flexibility.  
The upcoming columns API will add convenience for table-like data:

```tsx
// Future API — not yet available
<FlowGrid
  data={users}
  height={400}
  columns={[
    { key: "id", header: "ID", width: 80 },
    {
      key: "name",
      header: "Name",
      cell: ({ row }) => <strong>{row.name}</strong>,
    },
    { key: "email", header: "Email" },
  ]}
/>
```

### What columns will bring:

- Auto-generated `<table> / <thead> / <tbody>` structure
- Cells mapped automatically from column definitions
- Per-column custom renderers and styling
- Full headless flexibility — override any part

### API Strategy

Both APIs will coexist:

- `renderRow` → full control (lists, cards, custom layouts)
- `columns` → fast setup (tables, dashboards)

---

## Core Concept

```
Your Data → Virtualization Engine → Visible Rows → Your Custom UI
```

- Virtualization handles performance (only visible rows exist in DOM)
- FlowGrid maps data to rows and manages scroll
- You control how each row looks and behaves

---

## Roadmap

### ✅ Implemented

- Virtualized scrolling (TanStack Virtual)
- `renderRow` — custom row rendering
- Fixed row height support
- Scroll container + layout
- Headless design (zero styling imposed)
- Data-driven row rendering

### 🔜 Next Up

- columns API — data-driven table rendering
- Basic table structure (`thead`, `tbody`)
- Custom cell rendering per column
- TypeScript generics for data and columns

### 📋 Planned

- Row click / selection (single & multiple)
- Keyboard navigation (Arrow, Home, End)
- Hover states
- `onEndReached` — infinite scroll trigger
- Loading state / Empty state
- Client-side sorting
- Sticky header
- Column resizing
- Row expansion
- Grouped rows

---

## Philosophy

Rendering performance should not dictate user experience.

Pagination exists because the DOM struggles with thousands of rows.  
Virtualization fixes the DOM problem. FlowGrid removes pagination as a necessity.

- **Today:** A virtual list that solves scroll performance at scale
- **Tomorrow:** A full grid that also removes repetitive UI work

---

## Installation

```bash
npm install flowgrid @tanstack/react-virtual
```

```bash
yarn add flowgrid @tanstack/react-virtual
```

```bash
pnpm add flowgrid @tanstack/react-virtual
```

---

## License

MIT
