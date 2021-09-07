import React, { useState, useEffect } from "react";
import "./styles/output.css";
import "./styles/custom.css";

const App = (props) => {
  const FONTSIZEARRAY = ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
  const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const ACTIONS = [{ name: 'Left Hand', value: 'L' }, { name: 'Right Hand', value: 'R' }, { name: 'Both Hand', value: 'B' }];
  const START = 'START';
  const RULES = 'RULES';
  const ACTIONLIST = 'ACTIONLIST'
  let interval;
  let charInterval;

  const fontSizeLength = FONTSIZEARRAY.length;

  const [sliderValue, setSliderValue] = useState(fontSizeLength - 1);
  const [fontSize, setFontSize] = useState(FONTSIZEARRAY[fontSizeLength - 1]);
  const [timerSpeed, setTimerSpeed] = useState(1);
  const [countdown, setCountdown] = useState(10);
  const [displayChar, setDisplayChar] = useState([]);
  const [fontCapital, setFontCapital] = useState(true);
  const [gameDuration, setGameDuration] = useState(10);
  const [showContent, setShowContent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [noOfChars, setNoOfChars] = useState(gameDuration);
  const [gameStatus, setGameStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [alphaRules, setAlphaRules] = useState([]);
  const [newAction, setNewAction] = useState({ name: '', value: '' });
  const [gestures, setGestures] = useState(ACTIONS);
  const [displayContent, setDisplayContent] = useState(START);
  const randomChar = (max = ALPHABET.length) => Math.floor(Math.random() * (max));
  const randomAction = (max = gestures.length) => Math.floor(Math.random() * (max));

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

  const handleModalChange = (status) => {
    console.log(" Handle Modal: ", status)
    if (status === 'open') {
      setModalStatus(true);
    }
    else if (status === 'close') {
      setModalStatus(false);
    }
  }
  const genCharAction = () => {
    let tempRules = [];
    ALPHABET.map(alpha => {
      tempRules = [...tempRules, { name: alpha, value: gestures[randomAction()].value }];
    })
    setAlphaRules(tempRules);
  }

  const handleActionForm = (name, value) => {
    setNewAction({ name, value });
  }

  const handleSaveNewAction = (event) => {
    if (newAction.name && newAction.value) {
      setGestures([...gestures, { name: newAction.name, value: newAction.value }]);
    } handleModalChange('close');
    event.preventDefault();
  }
  //  const getSmallFontSize= (sliderValue-2)>=0?FONTSIZEARRAY[sliderValue-2]:'2xl';
  // const setFontSize=()=
  return (
    <div className="bg-gray-900 min-h-screen grid sm:grid-cols-5 p-3">

      <div className="col-span-full md:col-span-1 p-3 rounded-lg min-h-full">
        <div className="bg-gray-700 p-3 rounded-lg w-full">
          <button className="p-4 bg-purple-600 w-full rounded-lg font-bold text-white mb-4 hover:bg-purple-700 flex justify-center items-center" onClick={() => setDisplayContent(ACTIONLIST)}>
            Actions
          </button>
          <button className="p-4 w-full bg-purple-600 rounded-lg font-bold text-white mb-4 hover:bg-purple-700" onClick={() => setDisplayContent(RULES)}>
            Rules
          </button>
          <button className="p-4 w-full bg-green-400 rounded-lg font-bold text-white hover:bg-green-600" onClick={() => setDisplayContent(START)}>
            Game
          </button>
          {gameStatus && (<button className="p-4 w-full bg-red-600 rounded-lg font-bold text-white mt-5 hover:bg-red-700" onClick={handleStopGame}>
            Stop Game
          </button>)}
        </div>
      </div>

      {displayContent === START && (<div className="col-span-full md:col-span-4 flex flex-col flex-wrap justify-center content-center">
        {!showTimer && !showContent && (<div className="w-full md:w-2/4 bg-gray-700 p-3 my-3 rounded-lg">
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
        </div>)}
        <div className={` ${showContent ? 'block' : 'hidden'}`}>
          <h1 className={`text-${fontSize} text-white ${fontCapital ? 'uppercase' : 'lowercase'}`}>{displayChar.name}<span className={`text-2xl text-green-600 font-bold`}>{displayChar.value}</span></h1>
        </div>
        <div className={`mx-auto text-center ${showTimer ? 'block' : 'hidden'}`}>
          <h1 className={`text-${fontSize} text-white `}>{countdown}</h1>
          <h2 className="text-lg text-gray-100">Get Ready</h2>
        </div>
        <div id="countdown" className={`${!showTimer && !showContent ? '' : 'hidden'}`}>
          <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-green-700 w-full" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      </div>)}

      {displayContent === RULES && (<div className="grid grid-cols-7 sm:col-span-3 md:col-span-4 text-center">
        <div className="col-span-full flex flex-wrap justify-center content-center">
          <button className="p-4 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-700 w-max" onClick={genCharAction}>
            Generate New Rules
          </button></div>
        {alphaRules.map((alpha) => (<div className="col-span-1 bg-gray-600 m-2 flex flex-wrap justify-center content-center rounded-lg" key={randomChar() + alpha.name}>
          <p className={`text-white text-6xl  ${fontCapital ? 'uppercase' : 'lowercase'}`}>
            {alpha.name}<span className={`text-2xl text-green-600 font-bold`}>{alpha.value}</span></p>
        </div>))}

      </div>)}
      {displayContent === ACTIONLIST &&
        (<div className="sm:col-span-3 md:col-span-4 text-white p-6">
          <h2 className="text-lg text-gray-100 font-bold">Action Lists:</h2>
          <div className="grid grid-cols-3">
            {gestures.map((act, index) =>
            (<div className=" col-span-1 rounded-lg bg-gray-700 p-3 m-3 flex items-center" key={index + act.value}>
              <div className="bg-gray-800 mr-3 rounded-full h-10 w-10 flex items-center justify-center text-center text-lg" >{act.value}</div>
              <span>{act.name}</span>
            </div>))}
          </div>
          <div className="m-3">
            <button className="p-2 bg-blue-600 rounded-lg font-bold text-white mt-5 hover:bg-blue-700 flex items-center" onClick={() => handleModalChange('open')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white-600 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>  Add Action
            </button>
          </div>


        </div>)}
      <div className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-90 bg-gray-900 ${modalStatus ? 'block' : 'hidden'}`}>
        <dialog open={modalStatus} className="rounded-lg bg-white rounded shadow-lg w-10/12 md:w-1/2 p-0">
          {/* <div class="border-b flex justify-between items-center"> */}
          {/* <div class=""> */}
          <div className="border-b px-4 py-4 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Modal Title</h3>
            <button className="text-black close-modal" onClick={() => handleModalChange('close')}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg></button>
          </div>
          {/* <!-- modal body --> */}
          <div className="p-3">
            <form id="actionForm" onSubmit={handleSaveNewAction}>
              <label className="block">
                <span className="text-gray-700">Action Name</span>
                <input onChange={(event) => handleActionForm(event.target.value, newAction.value)} className="block w-full appearance-none placeholder-gray-500 border border-gray-400 rounded-md py-3 px-4 my-1 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Action Name" required />
              </label>
              <label className="block">
                <span className="text-gray-700">Action Letter</span>
                <input onChange={(event) => handleActionForm(newAction.name, event.target.value)} className="block w-full appearance-none placeholder-gray-500 border border-gray-400 rounded-md py-3 px-4 my-1 text-gray-700 leading-5 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Action Letter" required />
              </label>
            </form>
          </div>
          <div className="flex justify-end items-center w-100 border-t p-3">
            <button className="bg-white hover:bg-gray-300 px-3 py-1 rounded mr-1 close-modal" onClick={() => handleModalChange('close')}>Cancel</button>
            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white" form="actionForm" >Save</button>
            {/* </div> */}
            {/* </div> */}

          </div></dialog>
      </div>
    </div>

  );
}

export default App;
