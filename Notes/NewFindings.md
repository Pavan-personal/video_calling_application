# React Hooks & Context Providers

## Execution Order

- **`useEffect`**: Executes *after the component rendering*.
- **`useMemo`** and **`useCallback`**: Execute *during the component rendering*.

### Order of Execution

1. **`useMemo` or `useCallback`** (depending on their position in the component)
2. **`useEffect`**

---

## Hook Purposes

| Hook         | Purpose                          |
|--------------|----------------------------------|
| `useCallback`| Returns a memoized function      |
| `useMemo`    | Returns a memoized value         |
| `useEffect`  | Used for performing side effects |

---

## Context Providers

**Role**: Context Providers allow you to share data or features across the app without having to pass props through every component level.
