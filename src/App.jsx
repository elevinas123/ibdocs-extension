import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaCheck } from "react-icons/fa";
function App() {
  const [licejusAllowed, setLicejusAllowed] = useState(false)
  const [ibdocsAllowed, setIbdocsAllowed] = useState(false)
  
  useEffect(() => {
    chrome.storage.local.get(['licejusAllowed', 'ibdocsAllowed'], (result) => {
        if (chrome.runtime.lastError) {
            console.error(`Error retrieving values: ${chrome.runtime.lastError}`);
        } else {
            setLicejusAllowed(result.licejusAllowed ?? false);
            setIbdocsAllowed(result.ibdocsAllowed ?? false);
        }
    });
}, []);



const handleLicejusChange = () => {
  const newValue = !licejusAllowed;
  setLicejusAllowed(newValue);

  chrome.storage.local.set({ licejusAllowed: newValue }, () => {
      if (chrome.runtime.lastError) {
          console.error(`Error setting licejusAllowed: ${chrome.runtime.lastError}`);
      } else {
          console.log('licejusAllowed value saved.');
      }
  });
};


  const handleIbdocsChange = () => {
    const newValue = !ibdocsAllowed;
    setIbdocsAllowed(newValue);

    chrome.storage.local.set({ ibdocsAllowed: newValue }, () => {
        if (chrome.runtime.lastError) {
            console.error(`Error setting licejusAllowed: ${chrome.runtime.lastError}`);
        } else {
            console.log('licejusAllowed value saved.');
        }
    });
  };

  return (
      <div className='select-none'>
        <div className='flex flex-row justify-between' >
          <div>ibDocs</div>
          <div onClick={() => handleIbdocsChange(!ibdocsAllowed)} className={`cursor-pointer flex flex-col  ml-4 border rounded-full p-1 text-sm ${ibdocsAllowed? "border-green-500": "border-red-500"} `}><FaCheck className={`${ibdocsAllowed? "fill-green-500": " fill-red-500"}`} /></div>
        </div>
        <div className=' flex flex-row justify-between mt-4' >
          <div>libraryLicejus</div>
          <div onClick={() => handleLicejusChange(!licejusAllowed)} className={`cursor-pointer flex flex-col  ml-4 border rounded-full p-1 text-sm ${licejusAllowed? "border-green-500": "border-red-500"} `}><FaCheck className={`${licejusAllowed? "fill-green-500": " fill-red-500"}`} /></div>
        </div>
      </div>
  )
}

export default App
