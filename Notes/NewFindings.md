# React Hooks and Context Providers

## Execution Order

- `useEffect` executes after rendering of the component.
- `useMemo` and `useCallback` execute during the rendering of the component.

### Order of Execution

1. `useMemo` or `useCallback` (based on position)
2. `useEffect`

## Hook Purposes

- **`useCallback`**: Returns a memoized function.
- **`useMemo`**: Returns a memoized value.
- **`useEffect`**: Used for performing side effects.

## Context Providers

Context Providers are used to provide a certain feature or data to the entire app without passing props through every level of the component tree.
