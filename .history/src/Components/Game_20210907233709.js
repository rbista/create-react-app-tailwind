import React, { useState, useEffect } from "react";
import { Settings } from '.';
import "../styles/output.css";
import { ALPHABET } from '../constants';
const Game = (props) => {
const {gameDuration, alphaRules, timerSpeed, fontSize, fontCapital, gameStatus }=props;
console.log("GAME PROPS: ", props);
  let interval;
  let charInterval;

  const [fromLocalStorage, setFromLocalStorage] = useState({});

  const [countdown, setCountdown] = useState(10);
  const [displayChar, setDisplayChar] = useState([]);

  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [noOfChars, setNoOfChars] = useState(gameDuration);
  const [gameStatus, setGameStatus] = useState(false);

  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));

  useEffect(() => {
    window.clearInterval(interval);
    if (countdown > 0 && showTimer) {
      interval = window.setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    else if (countdown === 0 && showTimer) {
      setShowTimer(false);
      setShowContent(true);
      setCountdown(10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown, showTimer]);

  useEffect(() => {
    window.clearInterval(charInterval);
    if (noOfChars > 0 && showContent) {
      charInterval = window.setInterval(() => {
        setDisplayChar(alphaRules[randomChar()]);
        setNoOfChars(noOfChars - 1)
      }, timerSpeed * 1000);
    }
    else if (noOfChars === 0 && showContent) {
      setShowContent(false);
      setNoOfChars(gameDuration);
      setGameStatus(false);
    }
    return () => {
      clearInterval(charInterval);
    };
  }, [noOfChars, showContent]);

  const handleStartGame = () => {
    setShowTimer(true);
    setGameStatus(true);
  }

  return (
    <div className=" flex flex-col flex-wrap justify-center content-center h-full">
      {!showTimer && !showContent && (
        <Settings gameStatus={gameStatus} setNoOfChars={setNoOfChars} />
      )}
      {showContent && (
        <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'}`}>{displayChar.name}<span className={`text-2xl text-green-600 font-bold`}>{displayChar.value}</span></h1>
      )}
      <div className={`mx-auto text-center ${showTimer ? 'block' : 'hidden'}`}>
        <h1 className={`text-${fontSize} text-white `}>{countdown}</h1>
        <h2 className="text-lg text-gray-100">Get Ready</h2>
      </div>
      <div id="countdown" className={`${!showTimer && !showContent ? '' : 'hidden'}`}>
        <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-green-700 w-full" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Game;
