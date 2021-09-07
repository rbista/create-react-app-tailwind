import React, { useState, useEffect } from "react";
import "./styles/output.css";
import "./styles/custom.css";

const Rules = (props) => {
  const FONTSIZEARRAY = ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


  useEffect(() => {
    // const mindGameInfo = localStorage.getItem('mind-game');
    // const parsedInfo = mindGameInfo === 'undefined' ? false : JSON.parse(mindGameInfo);
    // if (parsedInfo) {
    //   console.log("PARSED INFO: ", parsedInfo);
    //   saveDefaults(parsedInfo);
    // }
    // else {
      genCharAction();
    // }
    // localStorage.setItem('mind-game', {name:'rajeev'});
  }, []);

 
  // const tempRules = fromLocalStorage.alphaRules ? fromLocalStorage.alphaRules : [];
  const [alphaRules, setAlphaRules] = useState(tempRules);

  const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
    })
    setAlphaRules(tempRules);
    // localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, alphaRules: tempRules }));
  }

  return (
    <div className="grid grid-row-6 text-center h-full gap-2">
      <div className="row-span-1 flex flex-wrap justify-center content-center">
        <button className="p-4 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-700 w-max" onClick={genCharAction}>
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
