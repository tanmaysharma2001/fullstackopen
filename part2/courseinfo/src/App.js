import Course from "./Components/Course.js"

const App = () => {
  // JSON data is needed as only one parameter is being passed

  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          name: "State of a component",
          exercises: 14,
        },
        {
          name: "Redux",
          exercises: 11,
        },
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  const content = []

  const renderContent = () => {
    for(let i = 0; i < courses.length; i++) {
      console.log("jhabdjksaasdasdd");
      content.push(<Course course={courses[i]} />);
    }
  }

  return (
    <tbody>
      {renderContent()}
      {content}
    </tbody>
  );
};

export default App;
