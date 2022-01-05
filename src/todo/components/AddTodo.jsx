import { useStore } from "effector-react";
import { RenderCounter } from "../../common/components";
import { $todo, changed, submit } from "../model";

import styles from "./AddTodo.module.css";

export const AddTodo = () => {
  const todo = useStore($todo);

  return (
    <div className={styles.add}>
      <input
        className={styles.input}
        onChange={({ target: { value } }) => changed(value)}
        value={todo}
        placeholder="Type"
      />
      <button className={styles.button} onClick={submit}>
        Add
      </button>
      <RenderCounter className={styles.counter} label="addTodo" />
    </div>
  );
};
