import { useEffect, useState } from "react";
import { UserProps } from "../types";
import service from "../services/UserService";
import "./User.css";

function User() {
  const [alias, setAlias] = useState("");
  const [users, setUsers] = useState([] as UserProps[]);
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  //disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = (e: any) => {
    e.preventDefault();
    setAlias("");
    setMail("");
    setPhone("");
  };

  const load = async () => {
    const res: UserProps[] = await service.get();
    setUsers(res);
  };

  const save = async (e: any) => {
    //evita o evento natural que é o submit do formulário
    e.preventDefault();
    if (
      alias &&
      alias.trim() !== "" &&
      mail &&
      mail.trim() !== "" &&
      phone &&
      phone.trim() !== ""
    ) {
      const res: any = await service.post({
        alias: alias.trim(),
        mail: mail.trim(),
        phone: phone.trim(),
      });
      if (res.error) {
        alert(res.error);
      } else {
        load();
        setAlias("");
        setMail("");
        setPhone("");
        alert('Cadastro efetuado com sucesso!')
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Cadastrar Usuário</h1>
        <form>
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
            <button onClick={save}>Salvar</button>
            <button onClick={reset}>Limpar</button>
          </div>
        </form>
      </div>
      <div id="tabela">
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
    </>
  );
}
export default User;
