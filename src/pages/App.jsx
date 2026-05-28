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
    const oldText = type === "name" ? value : text;
    let textShift = type === "shift" ? value : shift;
    const direction = mode ? 1 : -1;

    for (let i of oldText.split("")) {
      newText +=
        alphabets.latin[
          (alphabets.latin.length +
            (alphabets.latin.indexOf(i) + textShift * direction)) %
            alphabets.latin.length
        ];
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
  function onModeChange() {
    setMode(!mode);
    showResult("mode", "");
  }

  return (
    <form id="App">
      <h1 id="tittle">Cifra de César</h1>

      <button style={{ display: "none" }}></button>
      <header>
        <label htmlFor="">Texto</label>
        <textarea
        id="text"
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
        <button type="button" className={`${!mode}`} onClick={() => onModeChange()}>
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
