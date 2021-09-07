import React, { useState, useEffect } from "react";
import { Rules, Menu, Settings, Gestures, Game } from '.';
import "../styles/output.css";
import { FONTSIZEARRAY, ALPHABET, ACTIONS, START, RULES, ACTIONLIST } from '../constants';
const GameBody = (props) => {
   const {displayContent, defaultData, gameStatus, setGameStatus}= props;
  // const FONTSIZEARRAY = ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  // const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  // const ACTIONS = [{ name: 'Left Hand', value: 'L' }, { name: 'Right Hand', value: 'R' }, { name: 'Both Hand', value: 'B' }];
  // const START = 'START';
  // const RULES = 'RULES';
  // const ACTIONLIST = 'ACTIONLIST';
  // let interval;
  // let charInterval;
  const fontSizeLength = FONTSIZEARRAY.length;

  // const [defaultData, setFromLocalStorage] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const mindGameInfo = localStorage.getItem('mind-game');
  //   const parsedInfo = mindGameInfo === 'undefined' ? false : JSON.parse(mindGameInfo);
  //   if (parsedInfo) {
  //     console.log("PARSED INFO: ", parsedInfo);
  //     saveDefaults(parsedInfo);
  //   }
  //   // else {
  //   //   genCharAction();
  //   // }
  //   // localStorage.setItem('mind-game', {name:'rajeev'});
  // }, []);

  // const saveDefaults = (parsedInfo) => {
  //   const { } = parsedInfo;
  //   console.log(".asdfasdf", parsedInfo);
  //   setFromLocalStorage(parsedInfo);
  //   // if(){
  //   setLoading(false);
  //   // }
  // }

  // console.log(".--------------", defaultData);

  // const tempSlider = defaultData.fontSize ? FONTSIZEARRAY.indexOf(defaultData.fontSize) : fontSizeLength - 1;

  // const [sliderValue, setSliderValue] = useState(tempSlider);
  const tempFontSize = defaultData.fontSize ? defaultData.fontSize : FONTSIZEARRAY[fontSizeLength - 1];
  console.log(".--------------", tempFontSize);

  const [fontSize, setFontSize] = useState(tempFontSize);
  const tempTimer = defaultData.timerSpeed ? defaultData.timerSpeed : 1;
  const [timerSpeed, setTimerSpeed] = useState(tempTimer);
  // const [countdown, setCountdown] = useState(10);
  // const [displayChar, setDisplayChar] = useState([]);
  const tempCap = defaultData.hasOwnProperty('fontCapital') ? defaultData.fontCapital : true;
  console.log(".--------------", defaultData.fontCapital,tempCap);

  const [fontCapital, setFontCapital] = useState(tempCap);
  const tempDur = defaultData.gameDuration ? defaultData.gameDuration : 10;
  const [gameDuration, setGameDuration] = useState(tempDur);
  // const [showContent, setShowContent] = useState(false);
  // const [showTimer, setShowTimer] = useState(false);
  // const [noOfChars, setNoOfChars] = useState(gameDuration);
  // const [gameStatus, setGameStatus] = useState(false);
  // const [modalStatus, setModalStatus] = useState(false);
  const tempRules = defaultData.alphaRules ? defaultData.alphaRules : [];
  const [alphaRules, setAlphaRules] = useState(tempRules);
  // const [newAction, setNewAction] = useState({ name: '', value: '' });
  const tempGest = defaultData.gestures ? defaultData.gestures : ACTIONS;

  const [gestures, setGestures] = useState(tempGest);
  // const [displayContent, setDisplayContent] = useState(START);



  // const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  // const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

  // const genCharAction = () => {
  //   let tempRules = [];
  //   ALPHABET.map(alpha => {
  //     tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
  //   })
  //   setAlphaRules(tempRules);
  //   localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, alphaRules: tempRules }));
  // }

  // useEffect(() => {
  //   window.clearInterval(interval);
  //   if (countdown > 0 && showTimer) {
  //     interval = window.setInterval(() => {
  //       setCountdown(countdown - 1);
  //     }, 1000);
  //   }
  //   else if (countdown === 0 && showTimer) {
  //     setShowTimer(false);
  //     setShowContent(true);
  //     setCountdown(10);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [countdown, showTimer]);

  // useEffect(() => {
  //   window.clearInterval(charInterval);
  //   if (noOfChars > 0 && showContent) {
  //     charInterval = window.setInterval(() => {
  //       setDisplayChar(alphaRules[randomChar()]);
  //       setNoOfChars(noOfChars - 1)
  //     }, timerSpeed * 1000);
  //   }
  //   else if (noOfChars === 0 && showContent) {
  //     setShowContent(false);
  //     setNoOfChars(gameDuration);
  //     setGameStatus(false);
  //   }
  //   return () => {
  //     clearInterval(charInterval);
  //   };
  // }, [noOfChars, showContent]);

  // const handleFontChange = (event, b) => {
  //   const { value } = event.target;
  //   setSliderValue(value);
  //   setFontSize(FONTSIZEARRAY[value]);
  //   localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, fontSize: FONTSIZEARRAY[value] }));

  // }

  // const handleTimerSpeedChange = (event, b) => {
  //   const { value } = event.target;
  //   setTimerSpeed(value);
  //   localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, timerSpeed: value }));
  // }

  // const handleDurationChange = (event, b) => {
  //   const { value } = event.target;
  //   setGameDuration(value);
  //   setNoOfChars(parseInt(value / timerSpeed));
  //   localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, gameDuration: value, noOfChars: parseInt(value / timerSpeed) }));
  // }
  // const handleFontCapChange = () => {
  //   setFontCapital(!fontCapital);
  //   localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, fontCapital: !fontCapital }));
  // }

  // const handleStartGame = () => {
  //   setShowTimer(true);
  //   setGameStatus(true);
  // }

  // const handleStopGame = () => {
  //   setGameStatus(false);
  //   // setShowTimer(false);
  //   // setShowContent(false);
  //   // setNoOfChars(gameDuration);
  //   // setCountdown(10);
  // }


  return (
    <div className="row-start-1 sm:row-start-1 row-span-3 sm:col-span-4">
      {displayContent === START && (
          <Game defaultData={defaultData} gameStatus={gameStatus} setGameStatus={setGameStatus} gameDuration={gameDuration} alphaRules={alphaRules} timerSpeed={timerSpeed} setTimerSpeed={setTimerSpeed} fontSize={fontSize} fontCapital={fontCapital} setFontCapital={setFontCapital} />
        )}
      {displayContent === RULES && (< Rules defaultData={defaultData} fontCapital={fontCapital} gestures={gestures} alphaRules={alphaRules} setAlphaRules={setAlphaRules} />)}
      {displayContent === ACTIONLIST &&
        (
          <Gestures defaultData={defaultData} />
        )}
    </div>

  );
}

export default GameBody;
