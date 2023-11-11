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
    editMode: false,
  },
  {
    text: "tout défoncer",
    done: true,
    editMode: false,
  },
  {
    text: "je suis une autre todo",
    done: false,
    editMode: true,
  },
];

const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ulElement.innerHTML = "";
  ulElement.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerHTML = "Supprimer";
  const editButtonElement = document.createElement("button");
  editButtonElement.innerHTML = "Editer";
  deleteButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  editButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    toogleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
    `;
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  li.append(editButtonElement, deleteButtonElement);

  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = todo.text;

  const saveButtonElement = document.createElement("button");
  saveButtonElement.innerHTML = "Enregistrer";

  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.innerHTML = "Annuler";

  cancelButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    toogleEditMode(index);
  });

  saveButtonElement.addEventListener("click", (event) => {
    editTodo(index, inputElement);
  });

  li.append(inputElement, cancelButtonElement, saveButtonElement);

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

const toogleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
