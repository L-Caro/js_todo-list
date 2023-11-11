import "./style.css";

const ulElement = document.querySelector("ul");
const formElement = document.querySelector("form");
const inputElement = document.querySelector("form > input");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = inputElement.value;
  inputElement.value = "";
  addTodo(value);
});

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
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerText = "Supprimer";
  deleteButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
    `;
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  li.appendChild(deleteButtonElement);

  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

displayTodo();
