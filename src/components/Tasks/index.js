
import Task from "./../Task/index";
import { Container } from "./styles";

const Tasks = ({ tasks, checked }) => {

  return (
    <Container>
      {tasks.map((task) => (
        <Task key={task.id} task={task} checked={checked} />
      ))}
    </Container>
  );
};

export default Tasks;
