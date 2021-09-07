import React,{useState, useEffect} from "react";
import "./styles/output.css";

const App=(props)=> {
  const fontSizeArray = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','8xl','9xl'];
  let interval;


  const [sliderValue, setSliderValue]= useState(0);
  const [fontSize, setFontSize]= useState(fontSizeArray[0]);
  const [timerSpeed, setTimerSpeed]= useState(1000);
  const [timer, setTimer]= useState(10);
  useEffect(() => {
    window.clearInterval(interval);
    if(timer>0){interval = window.setInterval(() => {
      setTimer(timer-1);
    }, timerSpeed);}
    else{
      setTimer(10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleFontChange=(event,b)=>{
    const {value}= event.target;
    console.log("---------", value);
    setSliderValue(value);
    setFontSize(fontSizeArray[value]);
    // slideValue=slideValue+1;
  }

  const handleTimerSpeedChange=(event,b)=>{
    const {value}= event.target;
    setTimerSpeed(value*10);
  }

  // const setFontSize=()=
  return (
    <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
      <h1 className={`text-${fontSize} text-white`}>A</h1>
      <p className={'text-gray-400 mt-5 text-lg'}>
         Font Size
      </p>
      <input type="range" min="0" max="12" value={sliderValue} onChange={handleFontChange}/>
      <p className={'text-gray-400 mt-5 text-lg'}>
         Game Speed
      </p>
      <input type="range" min="1" max="10" value={timerSpeed} onChange={handleTimerSpeedChange}/>
      <p className={'text-gray-400 mt-5 text-xl'}>
     Time:
      </p>
      <p className={'text-gray-400 mt-5 text-9xl'}>
         {timer}
      </p>
      <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
        Start
      </button>
    </div>
  );
}

export default App;
