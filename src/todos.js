
let nextId = 0;

export default function createTodos(text,completed = false) {
    return {
      id: nextId++,
      text,
      completed,
    };
}

export const initialTodos = [
    createTodos('Get apples', true),
    createTodos('Get oranges', true),
    createTodos('Get carrots', false),
];