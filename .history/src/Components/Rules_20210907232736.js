import React, { useState } from "react";
import "../styles/output.css";
import { ALPHABET } from '../constants';

const Rules = (props) => {
  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

  const { fontCapital, gestures, defaultData } = props;

  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
    })
    localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, alphaRules: tempRules }));
    return tempRules;
  }
  const tempRules = defaultData.alphaRules ? defaultData.alphaRules : genCharAction();
  const [alphaRules, setAlphaRules] = useState(tempRules);

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
