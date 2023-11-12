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
    text: "Je suis une todo",
    done: false,
    editMode: false,
  },
  {
    text: "Tout défoncer",
    done: true,
    editMode: false,
  },
  {
    text: "Je suis une autre todo",
    done: false,
    editMode: false,
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
  deleteButtonElement.setAttribute("class", "danger");
  const editButtonElement = document.createElement("button");
  editButtonElement.innerHTML = "Editer";
  editButtonElement.setAttribute("class", "primary");

  deleteButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  editButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.addEventListener("dblclick", (event) => {
    toggleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p class="${todo.done ? "done" : ""}">${todo.text}</p>
    `;

  let timer;
  li.addEventListener("click", (event) => {
    if (event.detail === 1) {
      timer = setTimeout(() => {
        toggleTodo(index);
      }, 100);
    } else if (event.detail > 1) {
      clearTimeout(timer);
      toggleEditMode(index);
    }
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
  saveButtonElement.setAttribute("class", "success");

  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.innerHTML = "Annuler";
  cancelButtonElement.setAttribute("class", "danger");

  cancelButtonElement.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editTodo(index, inputElement);
    }
  });

  saveButtonElement.addEventListener("click", (event) => {
    editTodo(index, inputElement);
  });

  li.append(inputElement, cancelButtonElement, saveButtonElement);
  setTimeout(() => inputElement.focus(), 0);

  return li;
};

const addTodo = (text) => {
  text = text.trim();
  if (text !== "") {
    todos.push({
      text: `${text[0].toUpperCase()}${text.slice(1)}`,
      done: false,
    });
  }
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

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value.trim();
  if (value !== "") {
    todos[index].text = value;
    todos[index].editMode = false;
  } else {
    todos[index].editMode = false;
  }
  displayTodo();
};

displayTodo();
