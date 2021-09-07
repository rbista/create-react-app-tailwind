import React, { useState, useEffect } from "react";
import "./styles/output.css";
import "./styles/custom.css";

const App = (props) => {
  const FONTSIZEARRAY = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let interval;

  const fontSizeLength = FONTSIZEARRAY.length;
  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max - 1));
  // console.log(randomChar);
  const [sliderValue, setSliderValue] = useState(fontSizeLength - 1);
  const [fontSize, setFontSize] = useState(FONTSIZEARRAY[fontSizeLength - 1]);
  const [timerSpeed, setTimerSpeed] = useState(10);
  const [timer, setTimer] = useState(10);
  const [displaChar, setDisplayChar] = useState(ALPHABET[randomChar()]);
  const [fontCapital, setFontCapital] = useState(true);
  const [gameDuration, setGameDuration] = useState(10);
  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    window.clearInterval(interval);
     console.log("23234234-------",showTimer)
    if (timer > 0 && showTimer) {
      interval = window.setInterval(() => {
        setTimer(timer - 1);
      }, timerSpeed * 100);
    }
    else {
      setTimer(10);
      setShowTimer(false);
      setShowContent(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

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
  }
  const handleFontCapChange = () => {
    setFontCapital(!fontCapital);
  }

  const handleStartGame = () => {
    setShowTimer(true);
  }
  // const setFontSize=()=
  return (
    <div className="bg-gray-900 p-6 h-screen grid grid-cols-5">
      <div className="sm:col-span-2 md:col-span-1 bg-gray-800 p-6 rounded-lg">
        <h1 className={`text-xl text-white`}>Game Settings</h1>

        <p className={'text-gray-400 mt-5 text-lg'}>
          Font Size
        </p>
        <input type="range" min="0" max="12" value={sliderValue} onChange={handleFontChange} />
        <p className={'text-gray-400 mt-5 text-lg'}>
          Game Speed
        </p>
        <input type="range" min="1" max="10" value={timerSpeed} onChange={handleTimerSpeedChange} />
        <p className={'text-gray-400 mt-5 text-lg'}>
          Game Duration : {gameDuration} seconds
        </p>
        <input type="range" min="10" max="300" value={gameDuration} onChange={handleDurationChange} />
        <p className={'text-gray-400 mt-5 text-xl'}>
          Time:
        </p>


        <div className="mr-3 text-gray-300 font-medium">
          Font Transform:
        </div>
        <div className="flex items-center w-full mb-12">

          <label className="flex items-left cursor-pointer">

            <div className="mr-3 text-gray-400 font-medium">
              CAPITAL
            </div>
            <div className="relative">
              <input type="checkbox" id="toggleB" className="sr-only" onChange={handleFontCapChange} />
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

        <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white-600 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>  Add Action
        </button>
        
      </div>
      <div className={`sm:col-span-3 md:col-span-4 flex flex-wrap justify-center content-center ${showContent ? 'block' : 'hidden'}`}>
        <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'}`}>{displaChar}</h1>
      </div>
      <div className={`sm:col-span-3 md:col-span-4 flex flex-wrap justify-center content-center ${showTimer ? 'block' : 'hidden'}`}>
        <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'}`}>{timer}</h1>
      </div>
      <div id="countdown" className={`sm:col-span-3 md:col-span-4 flex flex-wrap justify-center content-center ${!showTimer && !showContent ? 'block' : 'hidden'}`}>
      <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600 w-max" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>

  );
}

export default App;
