import axios from "axios";
import { useState } from "react";

function User() {
  const [alias, setAlias] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  function salvar() {
    axios
      .post("http://localhost:3001/user", { alias, mail, phone })
      .then(({ data }) => console.log(data));
  }

  return (
    <div>
      {/* ALIAS */}
      <input
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Digite o nome"
      />
      <div>{alias}</div>

      {/* EMAIL */}
      <input
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        placeholder="Digite o email"
      />
      <div>{mail}</div>

      {/* PHONE */}
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Digite o telefone"
      />
      <div>{phone}</div>
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

export default User;