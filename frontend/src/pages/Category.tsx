import React, { useEffect, useState } from "react";
import { CategoriesProps } from "../types";
import CategoriesService from "../services/CategoriesService";

function Category() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([] as CategoriesProps[]);

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const categoryData = await CategoriesService.get();
        if (categoryData) {
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados das categorias:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: CategoriesProps[] = await CategoriesService.get();
    setCategories(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converter os campos numéricos para inteiros ou floats
    

    // Verificar se as conversões foram bem-sucedidas e se os campos obrigatórios foram preenchidos
    if (
      name.trim() !== ""
    ) {
      const res = await CategoriesService.post({
        name: name.trim()
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
    setName("");
  };
}

export default Category