import { useForm } from 'react-hook-form';

import { ITodo } from '@/types/todoTypes';
import * as SC from './TodoFormStyle';

interface IFormProps {
  request: (data: ITodo) => void;
  title: string;
}

const TodoForm = ({ request, title }: IFormProps) => {
  const { register, handleSubmit, reset } = useForm<ITodo>({ mode: 'onChange' });

  function onSubmit(data: ITodo) {
    request(data);
    reset({ title: '', content: '' });
  }

  return (
    <SC.Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{title}</h2>
      <SC.TodoInput
        id='todoTitle'
        type='text'
        placeholder='Title'
        {...register('title', { required: true })}
      />
      <SC.TodoInput
        id='todoContent'
        type='text'
        placeholder='Content'
        {...register('content', { required: true })}
      />
      <SC.PostButton type='submit'>추가</SC.PostButton>
    </SC.Form>
  );
};

export default TodoForm;
