import { useEffect, useState } from "react";
import { CategoryProps } from "../types";
import service from "../services/CategoryService";

function Category() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([] as CategoryProps[]);

  //disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    const res: CategoryProps[] = await service.get();
    setCategories(res);
  };

  const save = async (e: any) => {
    //evita o evento natural que é o submit do formulário
    e.preventDefault();
    if (name && name.trim() !== "") {
      const res: any = await service.post(name.trim());
      console.log(res);
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
    <>
      <h3>Categoria</h3>
      <form>
        <div>
          <label>Categoria</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <button onClick={save}>Salvar</button>
          <button onClick={reset}>Limpar</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Category;