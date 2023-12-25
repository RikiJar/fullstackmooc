const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} exercises={props.exercises}/>
            <Part part={props.part2} exercises={props.exercises2}/>
            <Part part={props.part3} exercises={props.exercises3}/>
        </div>
    )
}

export default Content