import { useEffect, useState } from "react";
import { UsersProps } from "../../types";
import UsersService from "../../services/UsersService";
import { Link } from "react-router-dom";
import "./modelo.css";

function User() {
  const [alias, setAlias] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([] as UsersProps[]);

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const userData = await UsersService.get();
        if (userData) {
          setUsers(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos usuários:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: UsersProps[] = await UsersService.get();
    setUsers(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converter os campos numéricos para inteiros ou floats
    

    // Verificar se as conversões foram bem-sucedidas e se os campos obrigatórios foram preenchidos
    if (
      alias.trim() !== "" &&
      mail.trim() !== "" &&
      phone.trim() !== ""
    ) {
      const res = await UsersService.post({
        alias: alias.trim(),
        mail: mail.trim(),
        phone: phone.trim()
      });
      if (res.error) {
        alert(res.error);
      } else {
        load();
        reset();
      }
    }
  };

  const reset = () => {
    setAlias("");
    setMail("");
    setPhone("");
  };

  return (
    <div className="conteudo">
      <h3>Usuário</h3>
      <form onSubmit={save}>
        <div>
          <label>Codinome</label>
          <br />
          <input value={alias} onChange={(e) => setAlias(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>Telefone</label>
          <br />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={reset}>
            Limpar
          </button>
          <Link to="/">Voltar</Link>
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Codinome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.alias}</td>
                <td>{item.mail}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
