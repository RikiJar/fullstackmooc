import Header from "./Header"
import Content from "./Content"

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    );
}

const Course = ({ course }) => {
    return (
        <div>
            {course.map((course) => (
                <div key={course.id}>
                    <Header course={course.name} />
                    {course.parts.map((part) => (
                        <p key={part.id}>
                            {part.name} {part.exercises}
                        </p>
                    ))}
                    <Total course={course} />
                </div>
            ))}
        </div>
    );
};



export default Course