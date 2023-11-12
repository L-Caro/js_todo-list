import "./style.css";

//* Elements
const ulElement = document.querySelector("ul");
const formElement = document.querySelector("form");
const inputElement = document.querySelector("form > input");

//* Datas
const todos = [
  {
    text: "1ere tâche à faire",
    done: false,
    editMode: false,
  },
  {
    text: "2e tâche à faire",
    done: true,
    editMode: false,
  },
  {
    text: "3e tâche à faire",
    done: false,
    editMode: false,
  },
];

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = inputElement.value;
  inputElement.value = "";
  addTodo(value);
});

//* Fonction d'affichage des todos
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

//* Fonctions de création des éléments
const createTodoElement = (todo, index) => {
  // Création de l'élément li
  const li = document.createElement("li");

  // Création du bouton de suppression de la todo
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerHTML = "Supprimer";
  deleteButtonElement.setAttribute("class", "danger");

  // Création du bouton d'édition de la todo
  const editButtonElement = document.createElement("button");
  editButtonElement.innerHTML = "Editer";
  editButtonElement.setAttribute("class", "primary");

  // Ajout de l'écoueur d'événement sur les éléments
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

  // création du contenu de l'élément li
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
  // Création de l'élément li
  const li = document.createElement("li");

  // Création de l'élément input
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = todo.text;

  // Création de l'élément d'enregistrement de la modification du todo
  const saveButtonElement = document.createElement("button");
  saveButtonElement.innerHTML = "Enregistrer";
  saveButtonElement.setAttribute("class", "success");

  // Création de l'élément d'annulation de la modification du todo
  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.innerHTML = "Annuler";
  cancelButtonElement.setAttribute("class", "danger");

  // Ajout de l'écoueur d'événement sur les éléments
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

//* Fonctions de gestion des todos
const addTodo = (text) => {
  text = text.trim(); // Supprime les espaces avant et après la chaine de caractère
  if (text !== "") {
    // Si la chaine de caractère n'est pas vide
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
  const value = input.value.trim(); // Supprime les espaces avant et après la chaine de caractère
  if (value !== "") {
    // Si la chaine de caractère n'est pas vide
    todos[index].text = value;
    todos[index].editMode = false;
  } else {
    todos[index].editMode = false;
  }
  displayTodo();
};

displayTodo();
