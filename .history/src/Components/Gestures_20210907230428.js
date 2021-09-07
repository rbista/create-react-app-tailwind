import React, { useState } from "react";
import "../styles/output.css";
import { ACTIONS } from '../constants';

const Gestures = (props) => {

  const { defaultData } = props;

  const [modalStatus, setModalStatus] = useState(false);
  const [newAction, setNewAction] = useState({ name: '', value: '' });
  const tempGest = defaultData.gestures ? defaultData.gestures : ACTIONS;
  const [gestures, setGestures] = useState(tempGest);

  const handleModalChange = (status) => {
    console.log(" Handle Modal: ", status)
    if (status === 'open') {
      setModalStatus(true);
    }
    else if (status === 'close') {
      setModalStatus(false);
    }
  }

  const handleActionForm = (name, value) => {
    setNewAction({ name, value });
  }

  const handleSaveNewAction = (event) => {
    if (newAction.name && newAction.value) {
      const tempGest = [...gestures, { name: newAction.name, value: newAction.value }];
      setGestures(tempGest);
      console.log("SKLDJKLSJDKL:", defaultData)
      localStorage.setItem('mind-game', JSON.stringify({ ...defaultData, gestures: tempGest }));
    }
    handleModalChange('close');
    event.preventDefault();
  }

  return (
    <div className="flex flex-col text-white p-6">
      <h2 className="text-lg text-gray-100 font-bold">Action Lists:</h2>
      <div className="grid sm:grid-cols-3">
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
      <div className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-90 bg-gray-900 ${modalStatus ? 'block' : 'hidden'}`}>
        <dialog open={modalStatus} className="rounded-lg bg-white shadow-lg w-10/12 md:w-1/2 p-0">
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
          </div></dialog>
      </div>
    </div>
  );
}

export default Gestures;
