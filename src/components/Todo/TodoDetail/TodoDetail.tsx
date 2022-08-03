import { useParams } from 'react-router-dom';

const TodoDetail = () => {
  const { todoId } = useParams();

  return <div>{todoId}</div>;
};

export default TodoDetail;
