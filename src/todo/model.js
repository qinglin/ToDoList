import _times from "lodash/times";
import { v4 as uuidv4 } from "uuid";
import { createEvent, restore, createStore, combine, sample } from "effector";

const getInitialTodos = () => [
  {
    id: uuidv4(),
    text: "memo",
    isDone: false
  },
  {
    id: uuidv4(),
    text: "useCallback",
    isDone: false
  },
  {
    id: uuidv4(),
    text: "useMemo",
    isDone: false
  }
];

export const submit = createEvent();
export const filterSet = createEvent();
export const submitted = createEvent();
export const changed = createEvent();
export const todoDone = createEvent();
export const filterCalled = createEvent();

export const $filterCallCount = createStore(0);
export const $filter = restore(filterSet, "all");
export const $todo = restore(changed, "").reset(submitted);
const $todosData = createStore(_times(300, getInitialTodos).flat());

$todosData
  .on(submitted, (state, todo) => [todo, ...state])
  .on(todoDone, (state, changedId) =>
    state.map((item) =>
      item.id === changedId
        ? {
            ...item,
            isDone: !item.isDone
          }
        : item
    )
  );

const filters = {
  completed: (todo) => todo.isDone,
  active: (todo) => !todo.isDone
};

export const $todos = combine($todosData, $filter, (todos, filterBy) => {
  if (filterBy === "all") {
    return todos;
  }
  const filterFn = filters[filterBy];
  return todos.filter(filterFn);
});

$todos.watch(() => {
  filterCalled();
});

$filterCallCount.on(filterCalled, (s) => s + 1);

sample({
  source: $todo,
  clock: submit,
  fn: (text) => ({ id: uuidv4(), text, isDone: false }),
  target: submitted
});
