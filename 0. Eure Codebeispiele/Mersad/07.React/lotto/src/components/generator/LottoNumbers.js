import React, { useState } from "react";
import Settings from "./Settings";

export default function LottoNumbers() {
  const [lottoNumbers, setLottoNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);

  function generateLottoNumbers() {
    let tempArray = [];
    for (let i = 0; i < lottoNumbers.length; i++) {
      tempArray[i] = Math.floor(minValue + Math.random() * maxValue);
    }
    setLottoNumbers(tempArray);
  }
  let lottoNumberDisplay = lottoNumbers.map((number) => (
    <span className="lottoNumber"> {number} </span>
  ));

  return (
    <div>
      {lottoNumberDisplay}
      <Settings
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
      <button onClick={generateLottoNumbers}>Generate Lottonumbers</button>
    </div>
  );
}
