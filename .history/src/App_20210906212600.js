import React, { useState, useEffect } from "react";
import "./styles/output.css";
import "./styles/custom.css";

const App = (props) => {
  const FONTSIZEARRAY = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const ACTIONS = [{ name: 'Left Hand', value: 'L' }, { name: 'Right Hand', value: 'R' }, { name: 'Both Hand', value: 'B' }]
  let interval;
  let charInterval;

  const fontSizeLength = FONTSIZEARRAY.length;
  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  const randomAction = (max = ACTIONS.length) => Math.floor(Math.random() * (max));

  const [sliderValue, setSliderValue] = useState(fontSizeLength - 1);
  const [fontSize, setFontSize] = useState(FONTSIZEARRAY[fontSizeLength - 1]);
  const [timerSpeed, setTimerSpeed] = useState(1);
  const [countdown, setCountdown] = useState(1);
  const [displayChar, setDisplayChar] = useState([]);
  const [fontCapital, setFontCapital] = useState(true);
  const [gameDuration, setGameDuration] = useState(10);
  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [noOfChars, setNoOfChars] = useState(gameDuration);
  const [gameStatus, setGameStatus] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [alphaRules, setAlphaRules] = useState([]);

  useEffect(() => {
    genCharAction();
  }, []);

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
    }
    return () => {
      clearInterval(charInterval);
    };
  }, [noOfChars, showContent]);

  const handleFontChange = (event, b) => {
    const { value } = event.target;
    setSliderValue(value);
    setFontSize(FONTSIZEARRAY[value]);
  }

  const handleTimerSpeedChange = (event, b) => {
    const { value } = event.target;
    setTimerSpeed(value);
  }

  const handleDurationChange = (event, b) => {
    const { value } = event.target;
    setGameDuration(value);
    setNoOfChars(parseInt(value / timerSpeed));

  }
  const handleFontCapChange = () => {
    setFontCapital(!fontCapital);
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

  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: ACTIONS[randomAction()].value }];
    })
    setAlphaRules(tempRules);

  }
  //  const getSmallFontSize= (sliderValue-2)>=0?FONTSIZEARRAY[sliderValue-2]:'2xl';
  // const setFontSize=()=
  return (
    <div className="bg-gray-900 p-6 h-screen grid grid-cols-5">
      <div className="sm:col-span-2 md:col-span-1 bg-gray-800 p-6 rounded-lg">
        <h1 className={`text-xl text-white`}>Game Settings</h1>
        <p className={'text-gray-400 mt-5 text-lg'}>
          Font Size
        </p>
        <input type="range" min="0" max="12" value={sliderValue} onChange={handleFontChange} disabled={gameStatus} />
        <p className={'text-gray-400 mt-5 text-lg'}>
          Game Speed: <span className="test-gray-500">{timerSpeed} sec</span>
        </p>
        <input type="range" min="1" max="10" value={timerSpeed} onChange={handleTimerSpeedChange} disabled={gameStatus} />
        <p className={'text-gray-400 mt-5 text-lg'}>
          Game Duration : {gameDuration} seconds
        </p>
        <input type="range" min="10" max="180" step="10" value={gameDuration} onChange={handleDurationChange} disabled={gameStatus} />
        <div className="mr-3 text-gray-300 font-medium">
          Font Transform:
        </div>
        <div className="flex items-center w-full mb-12">
          <label className="flex items-left cursor-pointer">
            <div className="mr-3 text-gray-400 font-medium">
              CAPITAL
            </div>
            <div className="relative">
              <input type="checkbox" id="toggleB" className="sr-only" onChange={handleFontCapChange} disabled={gameStatus} />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-green-400 w-6 h-6 rounded-full transition ${fontCapital ? '' : 'transform translate-x-6'}`}></div>
            </div>
            <div className="ml-3 text-gray-400 font-medium">
              small
            </div>
          </label>
        </div>
        {/* <input class="block appearance-none placeholder-green-500 border border-green-400 rounded-md py-3 px-4 m-1 text-green-700 leading-5 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Action Name"/>
      <input class="block appearance-none placeholder-green-500 border border-green-400 rounded-md py-3 px-4 m-1 text-green-700 leading-5 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Action Letter"/>
      <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
        Save
      </button> */}

        {/* <label class="inline-flex items-center mt-3">
                <input type="radio" class="form-radio h-5 w-5 text-gray-600" checked /><span class="ml-2 text-gray-300">label</span>
                <input type="email" class="form-input px-4 py-3 rounded-full"/>

            </label> */}
        {/* <label class="block">
                <span class="text-gray-700">Full name</span>
                <input type="text" class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder=""/>
              </label> */}

        <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-green-700 flex items-center" onClick={() => setShowActions(!showActions)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white-600 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>  Add Action
        </button>
        {gameStatus && (<button className="p-4 w-full bg-red-600 rounded-lg font-bold text-white mt-5 hover:bg-red-700" onClick={handleStopGame}>
          Stop Game
        </button>)}
        <button className="p-4 w-full bg-red-600 rounded-lg font-bold text-white mt-5 hover:bg-red-700" onClick={() => setShowRules(!showRules)}>
          Rules
        </button>

      </div>
      {!showRules && !showActions && (<div className="sm:col-span-3 md:col-span-4 flex flex-wrap justify-center content-center">
        <div className={` ${showContent ? 'block' : 'hidden'}`}>
          <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'}`}>{displayChar.name}<span className={`text-2xl text-green-600 font-bold`}>{displayChar.value}</span></h1>
        </div>
        <div className={`mx-auto text-center ${showTimer ? 'block' : 'hidden'}`}>
          <h1 className={`text-${fontSize} text-white `}>{countdown}</h1>
          <h2 className="text-lg text-gray-100">Get Ready</h2>
        </div>
        <div id="countdown" className={`${!showTimer && !showContent ? 'block' : 'hidden'}`}>
          <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-green-700 w-max" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      </div>)}

      {showRules && (<div className="grid grid-cols-7 sm:col-span-3 md:col-span-4 text-center">
        <div className="col-span-full flex flex-wrap justify-center content-center">
          <button className="p-4 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-700 w-max" onClick={genCharAction}>
            Generate New Rules
          </button></div>
        {alphaRules.map((alpha) => (<div className="col-span-1 bg-gray-600 m-2 flex flex-wrap justify-center content-center rounded-lg" key={randomChar() + alpha.name}>
          <p className={`text-white text-6xl  ${fontCapital ? 'uppercase' : 'lowercase'}`}>
            {alpha.name}<span className={`text-2xl text-green-600 font-bold`}>{alpha.value}</span></p>
        </div>))}

      </div>)}
      {showActions && (<div className="sm:col-span-3 md:col-span-4 text-white"><div className="grid grid-cols-3"> 
        {ACTIONS.map((act, index)=>(<div className=" col-span-1 rounded-lg bg-gray-700 p-3 m-3" key={index+act.value}>
          <span className="bg-gray-800 w-10 h-10 rounded-full">{act.value}</span>
          <span>{act.name}</span>
        </div>))}
        </div></div>)}
    </div>

  );
}

export default App;
