import React, { useEffect, useRef, useState} from 'react';
import './App.scss';
import Die from "./components/Die";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import stpowatch from './images/stopwatch.svg'
import goblet from './images/goblet.svg'

function App() {
  const [dice, setDice] = useState(randomNumberGenerator())
  const [tenzies, setTenzies] = useState(false)

  //best time
  // const [bestTime, setBestTime] = useState(()=>
  //   localStorage.getItem("bestTime") 
  //   ? JSON.parse(localStorage.getItem("bestTime")) 
  //   : null
  // )

  //stowatch function 
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(()=>{
    const allIsHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)

    if(allIsHeld && sameValue){
      setTenzies(true)
      console.log('YOu won');
    }
    if(tenzies){
      setRunning(false)
    }
    if(dice.length === 0){
      setTime(0)
    }

  })

  function generateDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function randomNumberGenerator(){
      const newDice = []

      for (let i = 0; i < 10; i++){
          newDice.push(generateDie())
      }
      return newDice
  }

  function refreshDice() {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          generateDie()
    }))
    count.current = count.current + 1;
  }

  const min = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const sec = ("0" + ((time / 10) % 100)).slice(-2)
  const recordTime = `${min}:${sec}`

  function refreshGame(){
    setTenzies(false)   
    setTime(0)
    setDice(randomNumberGenerator())
    count.current = 0

    // if(min > bestTime){
      // localStorage.setItem("bestTime", JSON.stringify(recordTime));
      // setBestTime(recordTime);

    // }
    // const maxSec = Math.max(...allRecords)
    
    console.log(recordTime)
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    if(dice.length > 0){
      setRunning(true)
    }

  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      holdDice={()=>holdDice(die.id)}
      />
  ))

  //stowatch function 
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);
  

  //count of Attempts 
  const count = useRef(0)



  return (
    <div className="main-container">
      <div className="board">
        <div className="board-inner">

          {/* <div className="overlay"></div> */}
          { tenzies && <Confetti width={640} height={525} className="confetti-container" />}

          <h2 className="board-title">Tenzies</h2>
          <p className="board-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

          <div className="stopwatch-container">
            <img src={stpowatch}  alt="" className="stopwatch-logo" />
            <div className="numbers">
              <span>{min}:</span>
              <span>{sec}</span>
            </div>
          </div>

          <div className="main-field">{diceElements}</div>

          <div className="button-container">
            {tenzies ? <button className="refreshGame-btn" onClick={refreshGame}>New game</button> : <button className="refreshDice-btn" onClick={refreshDice}>Roll</button>}
          </div>

          <div className="attemts-count">Attemts: {count.current}</div>

          {/* {bestTime &&
            <div className="best-time-container"> 
              <img src={goblet} alt="" className="best-time_image" />
              <p>Best time: {recordTime}</p>  
            </div>
          } */}
        </div>
      </div>
    </div>
  );
}

export default App;
