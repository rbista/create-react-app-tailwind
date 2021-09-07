import React, { useState, useEffect } from "react";
import { Menu, GameBody } from './Components';
import "./styles/output.css";
import "./styles/custom.css";
import {  START } from './constants';

const App = (props) => {

  const [fromLocalStorage, setFromLocalStorage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mindGameInfo = localStorage.getItem('mind-game');
    const parsedInfo = mindGameInfo === 'undefined' ? false : JSON.parse(mindGameInfo);
     if (parsedInfo || parsedInfo === null) {
       saveDefaults(parsedInfo);
    }
  }, []);

  const saveDefaults = (parsedInfo) => {
    setFromLocalStorage(parsedInfo||{});
    setLoading(false);
  }

  const [gameStatus, setGameStatus] = useState(false);
  const [displayContent, setDisplayContent] = useState(START);

  const handleStopGame = () => {
    setGameStatus(false);
  }

  return (
    <div>
      {!loading && (<div className="bg-gray-900 min-h-screen h-auto p-3  text-white grid sm:grid-cols-2 md:grid-cols-5 sm:grid-rows-1 gap-2">
        <div className="row-start-4 sm:row-start-1 sm:col-span-1 rounded-lg flex items-end sm:items-start">
          <Menu setDisplayContent={setDisplayContent} gameStatus={gameStatus} handleStopGame={handleStopGame}/>
        </div>
        <GameBody defaultData={fromLocalStorage} gameStatus={gameStatus} setGameStatus={setGameStatus} displayContent={displayContent}/>
      </div>)}
      {loading && (<div className="text-white">
        Loading
      </div>)}
    </div>
  );
}

export default App;
