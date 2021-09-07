import React, { useState } from "react";
import "../styles/output.css";

const Rules = (props) => {
  const FONTSIZEARRAY = ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

  const { fontCapital, gestures } = props;

  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
    })
    return tempRules;
  }

  const [alphaRules, setAlphaRules] = useState(genCharAction());

  return (
    <div className="grid grid-row-6 text-center h-full gap-2">
      <div className="row-span-1 flex flex-wrap justify-center content-center">
        <button className="p-4 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-700 w-max" onClick={()=>setAlphaRules(genCharAction())}>
          Generate New Rules
        </button>
      </div>
      <div className=" row-span-5 grid grid-cols-4 sm:grid-cols-7 h-full gap-2">
        {alphaRules.map((alpha) => (<div className="col-span-1 bg-gray-600 flex flex-wrap justify-center content-center rounded-lg" key={randomChar() + alpha.name}>
          <p className={`text-white text-6xl  ${fontCapital ? 'uppercase' : 'lowercase'}`}>
            {alpha.name}<span className={`text-2xl text-green-600 font-bold`}>{alpha.value}</span></p>
        </div>))}
      </div>
    </div>
  );
}

export default Rules;
