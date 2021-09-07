import React, { useState } from "react";
import "../styles/output.css";
import { FONTSIZEARRAY } from '../constants';
const Settings = (props) => {

  const { gameDuration, setGameDuration, gameStatus, timerSpeed, setTimerSpeed, fontSize, setFontSize, setNoOfChars, fontCapital, setFontCapital, defaultData } = props;
  const fontSizeLength = FONTSIZEARRAY.length;

  const tempSlider = fontSize ? FONTSIZEARRAY.indexOf(fontSize) : fontSizeLength - 1;

  const [sliderValue, setSliderValue] = useState(tempSlider);

  const handleFontChange = (event, b) => {
    const { value } = event.target;
    setSliderValue(value);
    setFontSize(FONTSIZEARRAY[value]);
    localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, fontSize: FONTSIZEARRAY[value] }));
  }

  const handleTimerSpeedChange = (event, b) => {
    const { value } = event.target;
    localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, timerSpeed: value }));
    setTimerSpeed(value);
  }

  const handleDurationChange = (event, b) => {
    const { value } = event.target;
    localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, gameDuration: value, noOfChars: parseInt(value / timerSpeed) }));
    setGameDuration(value);
    setNoOfChars(parseInt(value / timerSpeed));
  }

  const handleFontCapChange = () => {
    localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, fontCapital: !fontCapital }));
    setFontCapital(!fontCapital);
  }

  return (
    <div className="w-full md:w-2/4 lg:w-1/4 bg-gray-700 p-3 my-3 rounded-lg">
      <h1 className={`text-xl text-white`}>Game Settings</h1>
      <p className={'text-gray-400 mt-5 text-lg'}>
        Font Size:
      </p>
      <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'} text-center h-32`}>A</h1>
      <input className="w-full" type="range" min="0" max={fontSizeLength - 1} value={sliderValue} onChange={handleFontChange} disabled={gameStatus} />
      <p className={'text-gray-400 mt-5 text-lg'}>
        Game Speed: <span className="test-gray-500">{timerSpeed} sec</span>
      </p>
      <input className="w-full" type="range" min="1" max="10" value={timerSpeed} onChange={handleTimerSpeedChange} disabled={gameStatus} />
      <p className={'text-gray-400 mt-5 text-lg'}>
        Game Duration : {gameDuration} seconds
      </p>
      <input className="w-full" type="range" min="10" max="180" step="10" value={gameDuration} onChange={handleDurationChange} disabled={gameStatus} />
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
    </div>
  );
}

export default Settings;
