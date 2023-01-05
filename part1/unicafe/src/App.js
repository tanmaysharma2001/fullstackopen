import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Content = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1,
    };
    setClicks(newClicks);
  };

  const handleNeutralClicks = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
    };
    setClicks(newClicks);
  };

  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1,
    };
    setClicks(newClicks);
  };

  const calculateAll = () => {
    return clicks.good + clicks.neutral + clicks.bad;
  };

  const calculateAvg = () => {
    return calculateAll() / 3;
  };

  const positiveFeedback = () => {
    if (clicks.good === 0) {
      return 0;
    }
    return (clicks.good / calculateAll()) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text={"good"} />
      <Button handleClick={handleNeutralClicks} text={"neutral"} />
      <Button handleClick={handleBadClick} text={"bad"} />
      <br />
      <h1>statistics</h1>
      <Statistics
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
        all={calculateAll()}
        average={calculateAvg()}
        positive={positiveFeedback()}
      />
    </div>
  );
};

export default App;
