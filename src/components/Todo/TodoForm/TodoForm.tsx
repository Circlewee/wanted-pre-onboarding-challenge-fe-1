import { useForm } from 'react-hook-form';

import { ITodo, IFormType } from '@/types/todoTypes';
import * as SC from './TodoFormStyle';

interface IFormProps {
  request: (data: IFormType, id?: string) => void;
  title: string;
  default?: ITodo;
  cancelUpdate?: () => void;
}

const TodoForm = (props: IFormProps) => {
  const { register, handleSubmit, reset } = useForm<ITodo>({ mode: 'onChange' });

  function onSubmit(data: IFormType) {
    if (props.default) {
      props.request(data, props.default.id);
    }
    props.request(data);
    reset({ title: '', content: '' });
  }

  return (
    <SC.Form onSubmit={handleSubmit(onSubmit)}>
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
      <SC.PostButton type='submit'>추가</SC.PostButton>
      {props.cancelUpdate && <SC.PostButton onClick={props.cancelUpdate}>취소</SC.PostButton>}
    </SC.Form>
  );
};

export default TodoForm;
