# @tsx-use/state-with-history
Takes an `initialState: T` and produces an object that has properties `initial`, `previous`, &amp; `current`, as well as methods `set` (current), `revert` (to previous), &amp; `reset` (to initial).

## Usage

```tsx
import { useStateWithHistory } from '@tsx-use/state-with-history'

interface ComponentProps {
  total: number
}
function Component({ total: 0 }: ComponentProps) {
  const {
    initial,
    previous,
    current,
    set: setTotal,
    revert: revertTotal,
    reset: resetTotal
  } = useStateWithHistory(total);

  // TODO: think of a good use case that's not too complicated...
}
```
