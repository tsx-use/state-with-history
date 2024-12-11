import { /* useEffect, */ useState } from "react";

export function useStatesTimeline<T>(initialState: T) {
  const history: T[] = [];
  const [currentState, setCurrentState] = useState<T>(() => initialState);
  const [previousState, setPreviousState] = useState<T>(() => undefined);

  // // ? though useEffect is run on every render,
  // // ? the cleanup function returned is not:
  // useEffect(() => {
  //   // * cleanup runs before re-rendering,
  //   // * when there is still a difference
  //   // * between previousState & currentState.
  //   return () => {
  //     setPreviousState((previous) => {
  //       history.push(previous);
  //       return currentState
  //     });
  //   };
  // }, [currentState]);

  const setState = (state: T) => {
    history.push(currentState);
    setPreviousState(() => currentState);
    setCurrentState(() => state);
  };

  const revertState = () => {
    if (history.length === 0) {
      setPreviousState(() => undefined);
      setCurrentState(() => previousState);
    } else {
      const last = history.pop();
      setPreviousState(() => last);
      setCurrentState(() => initialState);
    }
  };

  const resetState = () => {
    history.length = 0;
    setPreviousState(() => undefined);
    setCurrentState(() => initialState);
  };

  return {
    current: currentState,
    initial: initialState,
    previous: previousState,
    reset: resetState,
    revert: revertState,
    set: setState,
  };
}
