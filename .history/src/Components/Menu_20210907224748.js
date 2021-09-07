import React, { useState, useEffect } from "react";
import "../styles/output.css";
import { START, RULES, ACTIONLIST } from '../constants';
const Menu = (props) => {

console.log("MENU:", props)
  // const [fromLocalStorage, setFromLocalStorage] = useState({});

  // const [gameStatus, setGameStatus] = useState(false);
 
  // const handleStopGame = () => {
  //   setGameStatus(false);
  //   // setShowTimer(false);
  //   // setShowContent(false);
  //   // setNoOfChars(gameDuration);
  //   // setCountdown(10);
  // }


  return (
    <div className="bg-gray-700 p-3 rounded-lg w-full grid grid-cols-3 gap-2">
      hi
      {/* {!gameStatus && (<div className="col-span-1  sm:col-span-full">
        <button className=" p-4 w-full bg-purple-600 rounded-lg font-bold text-white md:mb-4 hover:bg-purple-700 flex justify-center items-center" onClick={() => setDisplayContent(ACTIONLIST)}>
          Actions
        </button>
      </div>)}
      {!gameStatus && (<div className="col-span-1  sm:col-span-full">
        <button className="p-4 w-full bg-purple-600 rounded-lg font-bold text-white md:mb-4 hover:bg-purple-700" onClick={() => setDisplayContent(RULES)}>
          Rules
        </button>
      </div>)}
      {!gameStatus && (<div className="col-span-1 sm:col-span-full">
        <button className="p-4 w-full bg-green-400 rounded-lg font-bold text-white hover:bg-green-600" onClick={() => setDisplayContent(START)}>
          Game
        </button>
      </div>)}

      {gameStatus && (<div className="col-span-3 sm:col-span-full">
        <button className="p-4 w-full bg-red-600 rounded-lg font-bold text-white hover:bg-red-700" onClick={handleStopGame}>
          Stop Game
        </button>
      </div>)} */}
    </div>
  );
}

export default Menu;
