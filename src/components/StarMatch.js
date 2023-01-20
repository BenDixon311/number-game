// STAR MATCH - Starting Template
import React, { useState } from 'react';
import NumberBox from './NumberBox';
import Star from './Star';
import './StarMatch.css'


const PlayAgain = props => (
    <div className="game-done">
        <button onClick={() => props.onClick()}>Play Again!</button>
    </div>
);

const StarMatch = () => {
    
    const [stars, setStars] = useState(utils.random(1, 9))
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

//computations based on the state
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length === 0;

//functions
    //reset state to initial values.
    const resetGame = () => {
        setStars(utils.random(1,0))
        setAvailableNums(utils.range(1,9))
        setCandidateNums([])
    }

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used'
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    }
   
    //communicate status when we click on a number
    const onNumberClick = (number, currentStatus) => {
            console.log(number, currentStatus, stars);

            if (currentStatus == 'used') {
                return; //do nothing
            }
            
                const newCandidateNums = 
                currentStatus === 'available' 
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

            if (utils.sum(newCandidateNums) !== stars)
            {
                setCandidateNums(newCandidateNums);
            } else {
                const newAvailableNums = availableNums.filter(
                    n => !newCandidateNums.includes(n)
                );
                //redraw stars from what's available
                setStars(utils.randomSumIn(newAvailableNums, 9));
                setAvailableNums(newAvailableNums);
                setCandidateNums([]);
            }
    }

    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
                {gameIsDone ? (<PlayAgain onClick={resetGame} />) : (<Star count = {stars} />)}
          </div>
          <div className="right">
          {utils.range(1, 9).map(number => 
                <NumberBox
                    key={number} 
                    displayNum={number}
                    status={numberStatus(number)}
                    onClick={onNumberClick}
                />
            )}
            
          </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
      </div>
    );
  };
  
  // Color Theme
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  
  // Math science
  const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };
  

  export default StarMatch;
  // ReactDOM.render(<StarMatch />, mountNode);
  
  
  // *** The React 18 way:
  // root.render(<StarMatch />);