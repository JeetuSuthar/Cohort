import { useRef, useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const countRef=useRef()


  const startTimer =()=>{
   const timer= setInterval(()=>{
      setCount(c=>c+1);
    },1000);
    countRef.current=timer

  }
  const stopTimer=()=>{
    clearInterval(countRef.current)
  } 

  return (
   <>
   
      <div>
        <div className='text-3xl '>{count}</div>
        <button onClick={startTimer} className='bg-violet-400 m-2 p-2' >Start</button>
        <button onClick={stopTimer}  className='bg-blue-800 p-2'>Stop</button>
      </div>
   </>
  )
}

export default App
