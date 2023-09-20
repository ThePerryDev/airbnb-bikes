import axios from "axios";
import { useState } from "react";

function Bike() {
  const [name, setName] = useState("");
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

  function salvar() {
    axios
      .post("http://localhost:3001/bike", {
        name,
        idUser,
        idCategory,
        idBrand,
        color,
        size,
        material,
        gender,
        speedkit,
        rim,
        suspension,
        description,
        hourlyvalue,
        dailyvalue,
        latitude,
        longitude,
      })
      .then(({ data }) => console.log(data));
  }

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o ID do usuario"
      />
      <div>{name}</div>

      <input
        value={idUser}
        onChange={(e) => setIdUser(e.target.value)}
        placeholder="Digite o ID do usuario"
      />
      <div>{idUser}</div>

      <input
        value={idCategory}
        onChange={(e) => setIdCategory(e.target.value)}
        placeholder="Digite ID da categoria"
      />
      <div>{idUser}</div>

      <input
        value={idBrand}
        onChange={(e) => setIdBrand(e.target.value)}
        placeholder="Digite ID da marca"
      />
      <div>{idBrand}</div>

      <input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Digite a cor"
      />
      <div>{color}</div>

      <input
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="Digite o tamanho"
      />
      <div>{size}</div>

      <input
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        placeholder="Digite o material"
      />
      <div>{material}</div>

      <input
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Digite o genero"
      />
      <div>{gender}</div>

      <input
        value={speedkit}
        onChange={(e) => setSpeedkit(e.target.value)}
        placeholder="Digite o marchas"
      />
      <div>{speedkit}</div>

      <input
        value={rim}
        onChange={(e) => setRim(e.target.value)}
        placeholder="Digite o aro"
      />
      <div>{rim}</div>

      <input
        value={suspension}
        onChange={(e) => setSuspension(e.target.value)}
        placeholder="Digite a suspensão"
      />
      <div>{suspension}</div>

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Digite a descrição"
      />
      <div>{description}</div>

      <input
        value={hourlyvalue}
        onChange={(e) => setHourlyvalue(e.target.value)}
        placeholder="Digite o valor da hora"
      />
      <div>{hourlyvalue}</div>

      <input
        value={dailyvalue}
        onChange={(e) => setDailyvalue(e.target.value)}
        placeholder="Digite o valor do dia"
      />
      <div>{dailyvalue}</div>

      <input
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Digite a latitude"
      />
      <div>{latitude}</div>

      <input
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Digite a longitude"
      />
      <div>{longitude}</div>
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

export default Bike;
