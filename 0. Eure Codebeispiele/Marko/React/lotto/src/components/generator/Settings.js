import React, { useState } from "react";

export default function Settings({minValue, maxValue, setMaxValue, setMinValue}) {

  return (
    <>
      <div>
        Unteres Limit: <input onChange={(event) => setMinValue(parseInt(event.target.value))} type="number" placeholder="Minimum" value={minValue} />
      </div>
      <div>
        Oberes Limit: <input onChange={(event) => setMaxValue(parseInt(event.target.value))} type="number" placeholder="Maximum" value={maxValue} />
      </div>
    </>
  );
}
