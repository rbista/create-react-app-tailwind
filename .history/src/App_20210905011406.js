import "./styles/output.css";

const App=(props)=> {
  const handleChange=(a)=>{
    console.log("---------", a);
  }
  return (
    <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
      <h1 className="text-5xl text-white">A</h1>
      <p className="text-gray-400 mt-5 text-lg">
        L
      </p>
      <input type="range" min="1" max="100" value="50" onChange={handleChange}/>
      <button class="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
        Start
      </button>
    </div>
  );
}

export default App;
