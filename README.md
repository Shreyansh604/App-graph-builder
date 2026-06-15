# App Graph Builder

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run tsc --noEmit |

## Key Decisions

- **MSW** for mock APIs — intercepts real fetch calls so TanStack Query works exactly as it would against a real backend
- **Zustand** kept minimal — only stores UI state (selected app/node, dropdown open). Node data lives in TanStack Query cache and is mutated via `queryClient.setQueryData`
- **ReactFlow `updateNodeData`** used directly in the node component for tab/slider changes, avoiding prop drilling
- **No right panel** — the screenshot showed node inspection inline on the card itself, so the inspector was moved into the node

## Known Limitations

- Node positions aren't persisted — refreshing resets the layout
- No "Add Node" button yet (bonus feature)
- Emoji icons are placeholder — production would use proper SVG service icons