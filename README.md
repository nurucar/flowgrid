# FlowGrid

Headless, continuous-data-first virtual grid for React.  
Efficiently render large datasets using virtualization instead of pagination.

---

## Status

🚧 In active development — virtualized list and data-driven rendering completed

---

## Why FlowGrid?

Traditional tables often rely on pagination or render large DOM trees, which can negatively impact performance and user experience.

FlowGrid takes a different approach:

- Renders only visible rows using virtualization
- Avoids pagination as a primary navigation model
- Supports large datasets efficiently
- Keeps UI fully customizable (headless)

---

## Core Concept

FlowGrid separates concerns:

data → virtualization → render → UI

- Virtualization handles performance
- FlowGrid maps data to visible rows
- You control how rows are rendered

---

## Example

<FlowGrid
data={users}
height={400}
estimateRowSize={40}
renderRow={(user, index) => (
<div className="grid grid-cols-3 px-3 py-2 border-b">
<span>{user.id}</span>
<span>{user.name}</span>
<span>{user.email}</span>
</div>
)}
/>

---

## Roadmap

### Core (MVP)

- [ ] Basic table rendering (rows / columns)
- [ ] Column definition API
- [x] Custom cell rendering
- [x] Fixed row height
- [x] Scroll container + layout
- [x] Virtualized rendering (TanStack Virtual)
- [x] Data-driven row rendering

### UX / Interaction

- [ ] Row click
- [ ] Row selection (single / multiple)
- [ ] Hover states
- [ ] Keyboard navigation (basic)

### Data Handling

- [ ] Sorting (client-side)
- [ ] onEndReached (infinite scroll trigger)
- [ ] Loading state
- [ ] Empty state

### Customization

- [ ] Custom header renderer
- [ ] Component overrides (headless support)
- [ ] Styling hooks (className / style API)

### Performance

- [ ] Smooth scrolling optimization
- [ ] Memoization strategy
- [ ] Avoid unnecessary re-renders

### Advanced (Next Phase)

- [ ] Server-side data support
- [ ] Column resizing
- [ ] Column visibility toggle
- [ ] Sticky header
- [ ] Row expansion
- [ ] Grouped rows

### DX (Developer Experience)

- [ ] TypeScript generics support
- [x] Clean API design
- [ ] Error handling / warnings

### Testing & Tooling

- [x] Unit tests (Vitest / Jest)
- [ ] Component tests (RTL)
- [x] Storybook integration
- [x] Example playground

### Documentation

- [ ] Getting started guide
- [ ] API documentation
- [ ] Usage examples

---

## Philosophy

FlowGrid is built around a simple idea:

Rendering performance should not dictate user experience.

Instead of forcing pagination, FlowGrid enables smooth, continuous scrolling for large datasets.

---

## License

MIT
