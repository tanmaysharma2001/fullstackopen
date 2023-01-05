import { useState } from "react";


const Votes = (props) => {

  if(props.value == null) {
    return (
      <p>has 0 votes</p>
    )
  }
  return (
    <p>has {props.value} votes</p>
  )
}


const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = () => {
    setSelected(generateRandom(0, anecdotes.length - 1));
  }

  const voteCurrentAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const highestVote = () => {
    let maxIndex = 0;
    for(let i = 0; i < votes.length; i++) {
      if(votes[i] > votes[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  // complete after voting

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Votes value={votes[selected]} />
      <button onClick={voteCurrentAnecdote}>vote</button>
      <button onClick={handleClick}>Generate Random</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[highestVote()]}
      <Votes value={votes[highestVote()]} />
    </div>
  );
};

export default App;
