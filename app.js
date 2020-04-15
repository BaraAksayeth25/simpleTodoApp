const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector("form");
const todoList = document.querySelector(".todo-list");
const checkAll = document.querySelector(".check-all");
const todoFilter = document.querySelector(".todo-filter");
let todos = [];

todoFilter.addEventListener("input", (e) => {
  let filter = e.target.value;
  let allTodos = [...document.querySelectorAll(".todo")];
  allTodos.map((todo) => {
    if (filter == "all") return (todo.style.display = "flex");
    else if (filter == "complete") {
      !todo.classList.contains("complete")
        ? (todo.style.display = "none")
        : (todo.style.display = "flex");
    } else {
      todo.classList.contains("complete")
        ? (todo.style.display = "none")
        : (todo.style.display = "flex");
    }
  });
});

checkAll.addEventListener("change", () => {
  const list = [...document.querySelectorAll(".todo")];
  if (list.length == 0) {
    alert("Please Add a Todo");
    checkAll.checked = false;
  }
  if (checkAll.checked) {
    list.forEach((todo) => {
      if (!todo.classList.contains("complete")) {
        todo.classList.toggle("complete");
      }
    });
  } else {
    list.forEach((todo) => {
      if (todo.classList.contains("complete")) {
        todo.classList.remove("complete");
      }
    });
  }
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(todos);
  const todo = {
    name: todoInput.value,
    id: Math.round(Math.random() * 255 + 1),
    complete: false,
  };
  todos.push(todo);
  let todoApp = "";
  const valid = checkAll.checked && "complete";
  todos.map((todo) => {
    return (todoApp = ` <div data-id='${todo.id}' class="todo ${
      todo.complete && "complete"
    } ${valid || ""}">
    <li>${todo.name}</li>
    <button class='trash-btn btn delete-todo'><i class='fas fa-trash'></i></button>
    <button class='complete-btn btn checked-todo'><i class='fas fa-check'></i></button>
    </div> ${todoApp}`);
    // console.log(todo.id);
  });
  todoList.innerHTML = todoApp;
  todoInput.value = "";
});
todoList.addEventListener("click", (e) => {
  let todo = e.target;
  const idTodo = todo.parentElement.dataset.id;
  if (todo.classList.contains("delete-todo")) {
    todo.parentElement.classList.add("fall");
    todos = todos.filter((todo) => todo.id != idTodo);
    todo.parentElement.addEventListener("transitionend", () => {
      todo.parentElement.remove();
    });
  }
  if (todo.classList.contains("checked-todo")) {
    todos.map((todo) => (todo.id == idTodo ? (todo.complete = true) : todo));
    todo.parentElement.classList.toggle("complete");
  }
});
