import { useForm } from 'react-hook-form';

import { TodoData, TodoInput } from '@/types/todoTypes';
import * as SC from './TodoFormStyle';

interface Props {
  request: (data: TodoInput, id?: string) => void;
  title: string;
  default?: TodoData;
  cancelUpdate?: () => void;
}

const TodoForm = (props: Props) => {
  const { register, handleSubmit, reset } = useForm<TodoData>({ mode: 'onChange' });

  const submitRequest = (data: TodoInput) => {
    if (props.default) {
      props.request(data, props.default.id);
    }
    props.request(data);
    reset({ title: '', content: '' });
  };

  return (
    <SC.Form onSubmit={handleSubmit(submitRequest)}>
      <h2>{props.title}</h2>
      <SC.TodoInput
        id='todoTitle'
        type='text'
        placeholder='Title'
        defaultValue={props.default?.title}
        {...register('title', { required: true })}
      />
      <SC.TodoInput
        id='todoContent'
        type='text'
        placeholder='Content'
        defaultValue={props.default?.content}
        {...register('content', { required: true })}
      />
      <div>
        <SC.ActionButton type='submit'>추가</SC.ActionButton>
        {props.cancelUpdate && <SC.ActionButton onClick={props.cancelUpdate}>취소</SC.ActionButton>}
      </div>
    </SC.Form>
  );
};

export default TodoForm;
