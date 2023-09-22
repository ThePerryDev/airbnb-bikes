import React, { useEffect, useState } from "react";
import { BikeProps } from "../types";
import BikeService from "../services/BikeService";
import { Link } from "react-router-dom";
import "./modelo.css";

function Bike() {
  const [idUser, setIdUser] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [speedkit, setSpeedkit] = useState("");
  const [rim, setRim] = useState("");
  const [suspension, setSuspension] = useState("");
  const [description, setDescription] = useState("");
  const [hourlyvalue, setHourlyvalue] = useState("");
  const [dailyvalue, setDailyvalue] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bikes, setBikes] = useState([] as BikeProps[]);

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const bikeData = await BikeService.get();
        if (bikeData) {
          setBikes(bikeData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados das bicicletas:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: BikeProps[] = await BikeService.get();
    setBikes(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      idUser.trim() !== "" &&
      idCategory.trim() !== "" &&
      idBrand.trim() !== "" &&
      color.trim() !== "" &&
      size.trim() !== "" &&
      material.trim() !== "" &&
      gender.trim() !== "" &&
      speedkit.trim() !== "" &&
      rim.trim() !== "" &&
      suspension.trim() !== "" &&
      description.trim() !== "" &&
      hourlyvalue.trim() !== "" &&
      dailyvalue.trim() !== "" &&
      latitude.trim() !== "" &&
      longitude.trim() !== ""
    ) {
      const res = await BikeService.post({
        idUser: idUser.trim(),
        idCategory: idCategory.trim(),
        idBrand: idBrand.trim(),
        color: color.trim(),
        size: size.trim(),
        material: material.trim(),
        gender: gender.trim(),
        speedkit: speedkit.trim(),
        rim: rim.trim(),
        suspension: suspension.trim(),
        description: description.trim(),
        hourlyvalue: hourlyvalue.trim(),
        dailyvalue: dailyvalue.trim(),
        latitude: latitude.trim(),
        longitude: longitude.trim(),
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
    setIdUser("");
    setIdCategory("");
    setIdBrand("");
    setColor("");
    setSize("");
    setMaterial("");
    setGender("");
    setSpeedkit("");
    setRim("");
    setSuspension("");
    setDescription("");
    setHourlyvalue("");
    setDailyvalue("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div className="conteudo">
      <h3>Bicicleta</h3>
      <form onSubmit={save}>
        <div>
          <label>ID do Usuário</label>
          <br />
          <input value={idUser} onChange={(e) => setIdUser(e.target.value)} />
        </div>
        <div>
          <label>ID da Categoria</label>
          <br />
          <input
            value={idCategory}
            onChange={(e) => setIdCategory(e.target.value)}
          />
        </div>
        <div>
          <label>ID da Marca</label>
          <br />
          <input value={idBrand} onChange={(e) => setIdBrand(e.target.value)} />
        </div>
        <div>
          <label>Cor</label>
          <br />
          <input value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label>Tamanho</label>
          <br />
          <input value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div>
          <label>Material</label>
          <br />
          <input
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>
        <div>
          <label>Gênero</label>
          <br />
          <input value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>Marchas</label>
          <br />
          <input
            value={speedkit}
            onChange={(e) => setSpeedkit(e.target.value)}
          />
        </div>
        <div>
          <label>Aro</label>
          <br />
          <input value={rim} onChange={(e) => setRim(e.target.value)} />
        </div>
        <div>
          <label>Suspensão</label>
          <br />
          <input
            value={suspension}
            onChange={(e) => setSuspension(e.target.value)}
          />
        </div>
        <div>
          <label>Descrição</label>
          <br />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Valor da Hora</label>
          <br />
          <input
            value={hourlyvalue}
            onChange={(e) => setHourlyvalue(e.target.value)}
          />
        </div>
        <div>
          <label>Valor do Dia</label>
          <br />
          <input
            value={dailyvalue}
            onChange={(e) => setDailyvalue(e.target.value)}
          />
        </div>
        <div>
          <label>Latitude</label>
          <br />
          <input
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div>
          <label>Longitude</label>
          <br />
          <input
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={reset}>
            Limpar
          </button>
          <Link to="/">Voltar</Link>
        </div>
      </form>
      <div id="tabela">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID do Usuário</th>
              <th>ID da Categoria</th>
              <th>ID da Marca</th>
              <th>Cor</th>
              <th>Tamanho</th>
              <th>Material</th>
              <th>Gênero</th>
              <th>Marchas</th>
              <th>Aro</th>
              <th>Suspensão</th>
              <th>Descrição</th>
              <th>Valor da Hora</th>
              <th>Valor do Dia</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bikes) &&
              bikes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.idUser}</td>
                  <td>{item.idCategory}</td>
                  <td>{item.idBrand}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.material}</td>
                  <td>{item.gender}</td>
                  <td>{item.speedkit}</td>
                  <td>{item.rim}</td>
                  <td>{item.suspension}</td>
                  <td>{item.description}</td>
                  <td>{item.hourlyvalue}</td>
                  <td>{item.dailyvalue}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bike;
