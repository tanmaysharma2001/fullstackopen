const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  const content = [];

  const renderContent = () => {
    for (let i = 0; i < props.parts.length; i++) {
      content.push(<Part part={props.parts[i]} />);
    }
  };

  return (
    <tbody>
      {renderContent()}
      {content}
    </tbody>
  );
};

const Total = (props) => {
  // let exercises = 0;

  // for (let i = 0; i < props.parts.length; i++) {
  //   exercises += props.parts[i].exercises;
  // }

  const exercises = props.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      <p>
        <b>total of {exercises} exercises</b>
      </p>
    </>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;