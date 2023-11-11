import "./style.css";

const ulElement = document.querySelector("ul");

const todos = [
  {
    text: "je suis une todo",
    done: false,
  },
  {
    text: "tout défoncer",
    done: true,
  },
  {
    text: "je suis une autre todo",
    done: false,
  },
];

const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ulElement.innerHTML = "";
  ulElement.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
  return li;
};

displayTodo();
