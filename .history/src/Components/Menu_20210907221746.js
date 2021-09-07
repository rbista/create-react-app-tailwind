import React, { useState, useEffect } from "react";
import { Rules, Settings, Gestures, Game } from '.';
import "../styles/output.css";
import { FONTSIZEARRAY, ALPHABET, ACTIONS, START, RULES, ACTIONLIST } from '../constants';
const App = (props) => {
  // const FONTSIZEARRAY = ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  // const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  // const ACTIONS = [{ name: 'Left Hand', value: 'L' }, { name: 'Right Hand', value: 'R' }, { name: 'Both Hand', value: 'B' }];
  // const START = 'START';
  // const RULES = 'RULES';
  // const ACTIONLIST = 'ACTIONLIST';
  let interval;
  let charInterval;
  const fontSizeLength = FONTSIZEARRAY.length;

  const [fromLocalStorage, setFromLocalStorage] = useState({});

  useEffect(() => {
    const mindGameInfo = localStorage.getItem('mind-game');
    const parsedInfo = mindGameInfo === 'undefined' ? false : JSON.parse(mindGameInfo);
    if (parsedInfo) {
      console.log("PARSED INFO: ", parsedInfo);
      saveDefaults(parsedInfo);
    }
    else {
      genCharAction();
    }
    // localStorage.setItem('mind-game', {name:'rajeev'});
  }, []);

  const saveDefaults = (parsedInfo) => {
    const { } = parsedInfo;
    console.log(".asdfasdf", parsedInfo);
    setFromLocalStorage(parsedInfo);
    // if(){

    // }
  }

  console.log(".--------------", fromLocalStorage);

  const tempSlider = fromLocalStorage.fontSize ? FONTSIZEARRAY.indexOf(fromLocalStorage.fontSize) : fontSizeLength - 1;

  const [sliderValue, setSliderValue] = useState(tempSlider);
  const tempFontSize = fromLocalStorage.fontSize ? fromLocalStorage.fontSize : FONTSIZEARRAY[fontSizeLength - 1];
  console.log(".--------------", tempFontSize);

  const [fontSize, setFontSize] = useState(tempFontSize);
  const tempTimer = fromLocalStorage.timerSpeed ? fromLocalStorage.timerSpeed : 1;
  const [timerSpeed, setTimerSpeed] = useState(tempTimer);
  const [countdown, setCountdown] = useState(10);
  const [displayChar, setDisplayChar] = useState([]);
  const tempCap = fromLocalStorage.fontCapital ? fromLocalStorage.fontCapital : true;
  const [fontCapital, setFontCapital] = useState(tempCap);
  const tempDur = fromLocalStorage.gameDuration ? fromLocalStorage.gameDuration : 10;
  const [gameDuration, setGameDuration] = useState(tempDur);
  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [noOfChars, setNoOfChars] = useState(gameDuration);
  const [gameStatus, setGameStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const tempRules = fromLocalStorage.alphaRules ? fromLocalStorage.alphaRules : [];
  const [alphaRules, setAlphaRules] = useState(tempRules);
  const [newAction, setNewAction] = useState({ name: '', value: '' });
  const tempGest = fromLocalStorage.gestures ? fromLocalStorage.gestures : ACTIONS;
  console.log(".--------------", tempGest);

  const [gestures, setGestures] = useState(tempGest);
  const [displayContent, setDisplayContent] = useState(START);

  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
    })
    setAlphaRules(tempRules);
    localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, alphaRules: tempRules }));
  }

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

  const handleFontChange = (event, b) => {
    const { value } = event.target;
    setSliderValue(value);
    setFontSize(FONTSIZEARRAY[value]);
    localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, fontSize: FONTSIZEARRAY[value] }));

  }

  const handleTimerSpeedChange = (event, b) => {
    const { value } = event.target;
    setTimerSpeed(value);
    localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, timerSpeed: value }));
  }

  const handleDurationChange = (event, b) => {
    const { value } = event.target;
    setGameDuration(value);
    setNoOfChars(parseInt(value / timerSpeed));
    localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, gameDuration: value, noOfChars: parseInt(value / timerSpeed) }));
  }
  const handleFontCapChange = () => {
    setFontCapital(!fontCapital);
    localStorage.setItem('mind-game', JSON.stringify({ ...fromLocalStorage, fontCapital: !fontCapital }));
  }

  const handleStartGame = () => {
    setShowTimer(true);
    setGameStatus(true);
  }

  const handleStopGame = () => {
    setGameStatus(false);
    setShowTimer(false);
    setShowContent(false);
    setNoOfChars(gameDuration);
    setCountdown(10);
  }


  return (
    <div className="bg-gray-700 p-3 rounded-lg w-full grid grid-cols-3 gap-2">
      {!gameStatus && (<div className="col-span-1  sm:col-span-full">
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
      </div>)}
    </div>
  );
}

export default App;
