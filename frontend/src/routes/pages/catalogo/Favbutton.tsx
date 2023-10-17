import React, { useState } from 'react';
import favbuttonoff from "./img/fav-button-off.png";
import favbuttonon from "./img/fav-button-on.png";

const ToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <button onClick={toggle}>
        {isOn ? <img src={favbuttonoff} alt="Botão favorito desligado" /> : <img src={favbuttonon} alt="Botão favorito ligado" /> }
      </button>
    </div>
  );
};

export default ToggleButton;
