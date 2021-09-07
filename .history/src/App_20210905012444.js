import React,{useState} from "react";
import "./styles/output.css";

const App=(props)=> {
  const [sliderValue, setSliderValue]= useState(1);
  const handleChange=(event,b)=>{
    const {value}= event.target;
    console.log("---------", value);
    // setSliderValue(value);
    // slideValue=slideValue+1;
  }
  return (
    <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
      <h1 className="text-5xl text-white">A</h1>
      <p className="text-gray-400 mt-5 text-lg">
        L
      </p>
      <input type="range" min="1" max="100" value={sliderValue} onChange={handleChange}/>
      <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
        Start
      </button>
    </div>
  );
}

export default App;
