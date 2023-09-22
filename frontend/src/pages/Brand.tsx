import { useEffect, useState } from "react";
import { BrandProps } from "../types";
import service from "../services/BrandService";
import { Link } from "react-router-dom";
import "./modelo.css";

function Brand() {
  const [name, setName] = useState("");
  const [brands, setBrands] = useState([] as BrandProps[]);

  //disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    const res: BrandProps[] = await service.get();
    setBrands(res);
  };

  const save = async (e: any) => {
    //evita o evento natural que é o submit do formulário
    e.preventDefault();
    if (name && name.trim() !== "") {
      const res: any = await service.post(name.trim());
      if (res.error) {
        alert(res.error);
      } else {
        load();
      }
    }
  };

  const reset = (e: any) => {
    e.preventDefault();
    setName("");
  };

  return (
    <div className="conteudo">
      <h3>Marca</h3>
      <form onSubmit={save}>
        <div>
          <label>Marca</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={reset}>
            Limpar
          </button>
          <Link to="/">Voltar</Link>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Brand;
