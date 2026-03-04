# Reusable Table Component

A lightweight React table component with optional row selection and bulk actions.

## Features

- Reusable table rendering based on the shape of the input data.
- Optional selectable mode via props (`isSelectable`).
- Select-all checkbox with full support for:
  - unchecked state (none selected)
  - checked state (all selected)
  - indeterminate state (some selected)
- Dynamic selected count label (`None selected`, `Selected N`, `Selected All`).
- `Download Selected` button that is enabled only when at least one selected row has `status: "available"`.
- Download alert output includes only selected rows with `status: "available"`.

## Tech Stack

- React + Vite
- Vitest + React Testing Library
- ESLint

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app locally

```bash
npm run dev
```

### 3) Run tests

```bash
npm run test
```

## Available Scripts

- `npm run dev` — Start Vite development server.
- `npm run build` — Type-check and build production assets.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint.
- `npm run test` — Run tests once with Vitest.
- `npm run test:watch` — Run Vitest in watch mode.

## Component API

### `SelectableTable` props

- `data` (`Array<object>`) — Table rows.
- `name` (`string`, optional) — Table title and accessible table label.
- `isSelectable` (`boolean`, optional, default: `true`) — Enables or disables row selection UI.

## Example Usage

```jsx
<SelectableTable data={basicData} name="Basic Data" />
<SelectableTable data={advancedData} name="Advanced Data" />
<SelectableTable data={basicData} isSelectable={false} />
```
