import { useState } from "react";
import { useList, useStore } from "effector-react";
import { ColorPicker, RenderCounter } from "../common/components";
import { Todo, AddTodo, Filter } from "./components";
import { $todos, $filterCallCount, todoDone } from "./model";

import styles from "./TodoList.module.css";

export const TodoList = () => {
  const [color, setColor] = useState("#045975");
  const todos = useStore($todos);
  const callsCount = useStore($filterCallCount);

  const bgGradient = `linear-gradient(
    209.21deg,
    rgb(8, 126, 164) 13.57%,
    ${color} 98.38%
  )`;

  const list = useList($todos, {
    getKey: ({ id }) => id,
    fn: (todo) => <Todo key={todo.id} todo={todo} onChange={todoDone} />
  });

  return (
    <div className={styles.todoList}>
      <RenderCounter className={styles.counter} label="list" />
      <div className={styles.text}>
        Filter was called <span className={styles.count}>{callsCount}</span>
        times
      </div>
      <div className={styles.listBlock} style={{ background: bgGradient }}>
        <div className={styles.top}>
          <ColorPicker color={color} onChange={setColor} />
          <Filter />
        </div>
        {todos.length ? (
          <ul className={styles.list}>{list}</ul>
        ) : (
          <div className={styles.noTodos}>No todos found :(</div>
        )}
        <AddTodo />
      </div>
    </div>
  );
};
