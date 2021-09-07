import React,{useState} from "react";
import "./styles/output.css";

const App=(props)=> {
  const fontSizeArray = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','8xl','9xl'];


  const [sliderValue, setSliderValue]= useState(0);
  const [fontSize, setFontSize]= useState(fontSizeArray[0]);
  
  const handleFontChange=(event,b)=>{
    const {value}= event.target;
    console.log("---------", value);
    setSliderValue(value);
    setFontSize(fontSizeArray[value]);
    // slideValue=slideValue+1;
  }

  // const setFontSize=()=
  return (
    <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
      <h1 className={`text-${fontSize} text-white`}>A</h1>
      <p className={'text-gray-400 mt-5 text-lg'}>
         Font Size
      </p>
      <input type="range" min="0" max="12" value={sliderValue} onChange={handleFontChange}/>
      <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
        Start
      </button>
    </div>
  );
}

export default App;
