import React,{useState, useEffect} from "react";
import "./styles/output.css";

const App=(props)=> {
  const FONTSIZEARRAY = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','8xl','9xl'];
  const ALPHABET = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let interval;


  const [sliderValue, setSliderValue]= useState(0);
  const [fontSize, setFontSize]= useState(FONTSIZEARRAY[0]);
  const [timerSpeed, setTimerSpeed]= useState(1);
  const [timer, setTimer]= useState(10);
  const [displaChar, setDisplayChar]= useState(ALPHABET[0]);

   const randomChar= Math.random(26);
  useEffect(() => {
    window.clearInterval(interval);
    if(timer>0){interval = window.setInterval(() => {
      setTimer(timer-1);
    }, timerSpeed*100);}
    else{
      setTimer(10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleFontChange=(event,b)=>{
    const {value}= event.target;
    console.log("---------", randomChar);
    setSliderValue(value);
    setFontSize(FONTSIZEARRAY[value]);
    // slideValue=slideValue+1;
  }

  const handleTimerSpeedChange=(event,b)=>{
    const {value}= event.target;
    setTimerSpeed(value);
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
