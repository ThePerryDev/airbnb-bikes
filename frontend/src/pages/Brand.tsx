import React, { useEffect, useState } from "react";
import { BrandProps } from "../types";
import BrandsService from "../services/CategoriesService";

function Brand() {
  const [name, setName] = useState("");
  const [brands, setBrands] = useState([] as BrandProps[]);

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const brandData = await BrandsService.get();
        if (brandData) {
          setBrands(brandData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados das categorias:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: BrandProps[] = await BrandsService.get();
    setBrands(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converter os campos numéricos para inteiros ou floats
    

    // Verificar se as conversões foram bem-sucedidas e se os campos obrigatórios foram preenchidos
    if (
      name.trim() !== ""
    ) {
      const res = await BrandsService.post({
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

export default Brand