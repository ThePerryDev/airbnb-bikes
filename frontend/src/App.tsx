import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  function salvar() {
    console.log(name);
  }
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome"
      />
      <div>oi {name}</div>
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

export default App;
