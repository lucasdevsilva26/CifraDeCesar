import { useState } from "react";
import "./app.css";
function App() {
  const [mode, setMode] = useState(false);
  const alphabets = {
    latin: "abcdefghijklmnopqrstuvwxyz".split(""),
  };
  const [text, setText] = useState("");
  const [shift, setShift] = useState(0);
  const [newName, setNewName] = useState("");

  function showResult(type, value) {
    let newText = "";
    let oldText = type === "name" ? value : text;
    let textShift = type === "shift" ? value : NaN(shift) ? 0 : shift;

    if (!mode) {
      for (let i of oldText.split("")) {
        newText +=
          alphabets.latin[
            (alphabets.latin.indexOf(i) + textShift) % alphabets.latin.length
          ];
      }
    }
    setNewName(newText);
  }
  function onTextChange(e) {
    setText(e.target.value.toLowerCase());
    showResult("name", e.target.value);
  }
  function onShiftChange(e) {
    setShift(Number(e.target.value));
    showResult("shift", Number(e.target.value));
  }

  return (
    <form id="App">
      <h1>Cifra de César</h1>

      <button style={{ display: "none" }}></button>
      <header>
        <label htmlFor="">Texto</label>
        <textarea
          placeholder="Digite seu texto"
          required
          onChange={(e) => onTextChange(e)}
        ></textarea>

        <label htmlFor="">Deslocamento</label>
        <input
          type="number"
          min={0}
          placeholder="0"
          required
          onChange={(e) => onShiftChange(e)}
        />
      </header>

      <main>
        <button type="button" onClick={() => setMode(!mode)}>
          <span>Codificar</span>

          <div>
            <div style={{ left: mode ? "75%" : "0%" }}></div>
          </div>

          <span>Decodificar</span>
        </button>
      </main>

      <footer>
        <h1>Resultado</h1>
        <span>{newName}</span>
      </footer>
    </form>
  );
}
export default App;
