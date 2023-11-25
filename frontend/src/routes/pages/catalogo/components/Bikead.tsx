import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import api from "../../../../services/api";
import { BikeProps } from "../../../../types";
import reverseico from "../img/reverseico.png";
import "./bikead.css";

export const Bikead = () => {
  const [bikes, setBikes] = useState<BikeProps[]>([]);

  const getBikes = async () => {
    try {
      const response = await api.get(`/bike`);
      const data = response.data;

      // Ordena os objetos com base na propriedade 'id'
      const bikesOrdenadas = [...data].sort((a: any, b: any) => a.id - b.id);

      setBikes(bikesOrdenadas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBikes();
  }, []);

  class MyNode<T> {
    value: T;
    next: MyNode<T>;

    constructor(v: T) {
      this.value = v;
      this.next = {} as MyNode<T>;
    }
  }

  class Stack<T> {
    length: number;
    top: MyNode<T>;

    constructor() {
      this.top = {} as MyNode<T>;
      this.length = 0;
    }

    is_empty() {
      return this.length === 0;
    }

    push(node: MyNode<T>) {
      node.next = this.top;
      this.top = node;
      ++this.length;
    }

    pop(): MyNode<T> {
      let node = {} as MyNode<T>;
      if (!this.is_empty()) {
        node = this.top;
        this.top = this.top.next;
        --this.length;
      }
      return node;
    }

    print() {
      let current_node = this.top;
      console.log("vvvv Top ");
      while (Object.keys(current_node).length !== 0) {
        console.log(current_node.value);
        current_node = current_node.next;
      }
      console.log("^^^^ Base ");
    }
  }

  const invertBikes = () => {
    // Cria uma instância de Stack
    const stack = new Stack<BikeProps>();

    // Empilha as bicicletas na ordem atual
    bikes.forEach((bike) => {
      const node = new MyNode<BikeProps>(bike);
      stack.push(node);
    });

    // Desempilha para inverter a ordem
    const bikesInvertidas: BikeProps[] = [];
    while (!stack.is_empty()) {
      const node = stack.pop();
      bikesInvertidas.push(node.value);
    }
    console.log(bikesInvertidas)
    setBikes(bikesInvertidas);
  };

  const getTotalBikes = () => {
    const totalBikes = bikes.reduce((total) => total + 1, 0);
    console.log(totalBikes)
    return totalBikes;
  };

  return (
    <Row id="bikead-row">
      <button onClick={invertBikes} className="reverse-button">
        <img id="reverse-button" src={reverseico} alt="Filter Button" />
        Inverter a ordem
      </button>
      <p>Total de bicicletas disponíveis: {getTotalBikes()}</p>
      {bikes.length === 0 ? (
        <p>Não há bicicletas disponíveis</p>
      ) : (
        bikes?.map((bike) => (
          <div className="bikead" key={bike.id}>
            <div className="bikecontent">
              <div className="bikephoto">
                {bike.photos[0] ? (
                  <img
                    src={`http://localhost:3001/photo/public/${bike.photos[0].filename}`}
                    alt="bike"
                    className="home-bike-photo"
                  />
                ) : (
                  <p>Foto não disponível</p>
                )}
              </div>
              <h3>{bike.name}</h3>
              <div className="descritivo">
                {bike.description} and {bike.id}
              </div>
              <div className="adjust-between">
                <h3>R$ {bike.hourlyvalue}</h3>
                <button id="details-button">Details</button>
              </div>
              <div className="adjust-between">
                <p>{bike.latitude + "," + bike.longitude}</p>
                <button>fav</button>
              </div>
            </div>
          </div>
        ))
      )}
    </Row>
  );
};
