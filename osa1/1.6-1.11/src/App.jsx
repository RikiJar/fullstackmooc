import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      { props.good + props.neutral + props.bad === 0
      ? <p> No feedback given</p>
      : (
        <>
          <StatisticsLine text="Good" value={props.good} />
          <StatisticsLine text="Neutral" value={props.neutral} />
          <StatisticsLine text="Bad" value={props.bad} />
          <StatisticsLine text="All" value={props.good + props.neutral + props.bad} />
          <StatisticsLine text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
          <StatisticsLine text="Positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100 + "%"} />
        </>
      )}
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>Give feedback</h1>
    <table>
      <tr>
        <td><button onClick={() => setGood(good+1)}>Good</button></td>
        <td><button onClick={() => setNeutral(neutral+1)}>Neutral</button></td>
        <td><button onClick={() => setBad(bad+1)}>Bad</button></td>      
      </tr>
    </table>
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>  
  )
}

export default App