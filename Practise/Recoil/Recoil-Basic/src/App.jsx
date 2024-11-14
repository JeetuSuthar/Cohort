
import { counterAtom, evenSelector } from '../store/atoms/counter';
import './App.css'
import {RecoilRoot , atom,useRecoilValue,useSetRecoilState} from "recoil";

function App() {
  
  return (
    <RecoilRoot>
      <Counter/>
      <IsEven/>
    </RecoilRoot>
  )
}

function Counter (){

  return (
    <div>
      <CurrentCount/>
      <Increment/>
      <Decrement/>
    </div>
  )
}

function CurrentCount(){
const count=useRecoilValue(counterAtom)
return (
  <div>
    {count}
  </div>
)
}
function Increment(){
  const setCount = useSetRecoilState(counterAtom)
  return <div>
    <button onClick={()=>setCount(c=>c+1)}>increase</button>
  </div>
}
function Decrement(){
  const setCount = useSetRecoilState(counterAtom)
  return <div>
    <button onClick={()=>setCount(c=>c-1)}>decrease</button>
  </div>
}

function IsEven(){
  const even=useRecoilValue(evenSelector);
  return <div>
    {even? "EVEN":"ODD"}
  </div>
}

export default App
