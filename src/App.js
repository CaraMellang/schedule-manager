import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useCallback, useState, useRef } from 'react';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `라노벨 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   { id: 1, text: '리액트기초 알기', checked: true },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링',
  //     checked: true,
  //   },
  //   { id: 3, text: '일정관리 앱 만들기', checked: false },
  // ]);

  const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(4);
  // const nextId = useRef(2501);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextId 1씩 더하기
    },
    // [todos],
    [],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    // [todos],
    [],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
