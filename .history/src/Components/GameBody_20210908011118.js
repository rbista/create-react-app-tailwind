import React, { useState } from "react";
import { Rules, Gestures, Game } from '.';
import "../styles/output.css";
import { FONTSIZEARRAY,  ACTIONS, START, RULES, ACTIONLIST } from '../constants';

const GameBody = (props) => {

   const {displayContent, defaultData, gameStatus, setGameStatus}= props;

  const fontSizeLength = FONTSIZEARRAY.length;

  const tempFontSize = defaultData.hasOwnProperty('fontSize') ? defaultData.fontSize : FONTSIZEARRAY[fontSizeLength - 1];
   const [fontSize, setFontSize] = useState(tempFontSize);
  const tempTimer = defaultData.hasOwnProperty('timerSpeed') ? defaultData.timerSpeed : 1;
  const [timerSpeed, setTimerSpeed] = useState(tempTimer);
  const tempCap = defaultData.hasOwnProperty('fontCapital') ? defaultData.fontCapital : true;
  const [fontCapital, setFontCapital] = useState(tempCap);
  const tempDur = defaultData.hasOwnProperty('gameDuration') ? defaultData.gameDuration : 10;
  const [gameDuration, setGameDuration] = useState(tempDur);
  const tempRules = defaultData.hasOwnProperty('alphaRules') ? defaultData.alphaRules : [];
  const [alphaRules, setAlphaRules] = useState(tempRules);
  const tempGest = defaultData.hasOwnProperty('gestures') ? defaultData.gestures : ACTIONS;
  const [gestures, setGestures] = useState(tempGest);

  return (
    <div className="row-start-1 sm:row-start-1 row-span-3 sm:col-span-4">
      {displayContent === START && (
          <Game defaultData={defaultData} gameStatus={gameStatus} setGameStatus={setGameStatus} gameDuration={gameDuration} setGameDuration={setGameDuration} alphaRules={alphaRules} timerSpeed={timerSpeed} setTimerSpeed={setTimerSpeed} fontSize={fontSize} setFontSize={setFontSize} fontCapital={fontCapital} setFontCapital={setFontCapital} />
        )}
      {displayContent === RULES && (< Rules defaultData={defaultData} fontCapital={fontCapital} gestures={gestures} alphaRules={alphaRules} setAlphaRules={setAlphaRules} />)}
      {displayContent === ACTIONLIST &&
        (
          <Gestures defaultData={defaultData} gestures={gestures} setGestures={setGestures}/>
        )}
    </div>

  );
}

export default GameBody;
