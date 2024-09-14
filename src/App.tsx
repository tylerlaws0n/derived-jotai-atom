import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtom, atom } from "jotai";

const makeUseDerivedAtom = <Start, Derived>(
  fn: (start: Start) => Derived
): ((start: Start) => Derived) => {
  const dAtom = atom<Derived>();

  return (start: Start): Derived => {
    const [derivedState, setDerivedState] = useAtom(dAtom);

    useEffect(() => {
      setDerivedState(fn(start));
    }, [setDerivedState, start]);

    return derivedState!;
  };
};

const useDoubledAtom = makeUseDerivedAtom((start: number) => start * 2);

function App() {
  const [count, setCount] = useState(0);

  const doubledCount = useDoubledAtom(count);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Doubled Count: {doubledCount}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
