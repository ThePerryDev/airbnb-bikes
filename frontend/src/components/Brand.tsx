import axios from "axios";
import { useState } from "react";

function Brand() {
  const [name, setName] = useState("");
  function salvar() {
    axios
      .post("http://localhost:3001/brand", { name })
      .then(({ data }) => console.log(data));
  }

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome"
      />
      <div>{name}</div>
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

export default Brand;