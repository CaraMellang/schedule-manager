import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  // return (
  //   <div className="TodoList">
  //     {todos.map((todo) => (
  //       <TodoListItem
  //         todo={todo}
  //         key={todo.id}
  //         onRemove={onRemove}
  //         onToggle={onToggle}
  //       />
  //     ))}
  //   </div>
  // );

  //최적화 코드
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <List
      className="TodoList"
      width={512} //전체크기
      height={513} //전체높이
      rowCount={todos.length} //항목개수
      rowHeight={57} //항목높이
      rowRenderer={rowRenderer} //항목을 렌더링할때 쓰는 함수
      list={todos} //배열
      style={{ outline: 'none' }} //List에 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);
