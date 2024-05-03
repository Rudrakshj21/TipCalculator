import { useState } from "react";
import "./App.css";
export default function App() {
  const [bill, setBill] = useState("");
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const serviceOptions = [
    "Dissatisfied (0%)",
    "It was okay (5%)",
    "It was good (10%)",
    "It was amazing (20%)",
  ];

  // derived state
  const tip = Number(bill * ((p1 + p2) / 2 / 100));

  function reset() {
    setP1(0);
    setP2(0);
    setBill("");
  }
  return (
    <div className="app">
      <BillInput handler={setBill} bill={bill}>
        How much was the bill?
      </BillInput>
      <Select options={serviceOptions} onSelect={setP1} percentage={p1}>
        How did you like the service?
      </Select>{" "}
      <Select options={serviceOptions} onSelect={setP2} percentage={p2}>
        How did your friend like the service?
      </Select>
      <div>
        You pay ${bill + tip} (${bill} + ${tip} tip)
      </div>
      <button
        onClick={reset}
        style={{ display: `${bill === ""  ? "none" : ""}` }}
      >
        Reset
      </button>
    </div>
  );
}

function BillInput({ children, handler, bill }) {
  return (
    <div>
      <span>{children}</span>
      <input
        type="number"
        placeholder="bill value"
        value={bill}
        onChange={(e) => handler(Number(e.target.value))}
      ></input>
    </div>
  );
}

function Select({ children, options, onSelect, percentage }) {
  return (
    <div>
      <span>{children}</span>
      <select value={percentage} onChange={(e) => onSelect(+e.target.value)}>
        {options.map((option, index) => {
          return (
            <option value={calculateVal(option)} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function calculateVal(option) {
  return option.split("(")[1].split("%")[0];
}
