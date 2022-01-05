import { useStore } from "effector-react";
import { RenderCounter } from "../../common/components";
import { $filter, filterSet } from "../model";

import styles from "./Filter.module.css";

export const Filter = () => {
  const filter = useStore($filter);

  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name="filter"
          checked={filter === "all"}
          onChange={() => filterSet("all")}
        />
        <span className={styles.text}>All</span>
      </label>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name="filter"
          checked={filter === "active"}
          onChange={() => filterSet("active")}
        />
        <span className={styles.text}>Active</span>
      </label>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name="filter"
          checked={filter === "completed"}
          onChange={() => filterSet("completed")}
        />
        <span className={styles.text}>Completed</span>
      </label>
      <RenderCounter className={styles.counter} label="filters" />
    </div>
  );
};
