import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtom, atom } from "jotai";

const makeUseDerivedAtom = <Args extends any[], Derived>(
  fn: (...args: Args) => Derived
): ((...args: Args) => Derived) => {
  const dAtom = atom<Derived>();

  return (...args: Args): Derived => {
    const [derivedState, setDerivedState] = useAtom(dAtom);

    useEffect(() => {
      console.log("setDerivedState", args);
      setDerivedState(fn(...args));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, args);

    return derivedState!;
  };
};

const useRepeatedName = makeUseDerivedAtom((start: number, name: string) =>
  `${name}\n`.repeat(start)
);

function App() {
  const [rerenderFlag, setRerender] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  const doubledCount = useRepeatedName(count, name);

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
      <button onClick={() => setRerender((r) => !r)}>
        Toggle Rerender {rerenderFlag.toString()}
      </button>
      <div className="card">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
