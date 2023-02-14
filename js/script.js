"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const btnTodoRemove = document.querySelector(".todo-remove");
const btnTodoComplete = document.querySelector(".todo-complete");
let newToDo = {};
let toDoData = [];

const trim = function (value) {
  return value.replace(/^\s+|\s+$/g, "");
};

const renderToDo = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData = JSON.parse(localStorage.getItem("arr"));
  toDoData.forEach(function (item, index) {
    let li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `<span class="text-todo">${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;

    if (!item.completed) {
      todoList.append(li);
    } else {
      todoCompleted.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      if (toDoData.includes(item)) {
        item.completed = !item.completed;
      }

      localStorage.setItem("arr", JSON.stringify(toDoData));
      renderToDo();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      if (toDoData.includes(item)) {
        toDoData.splice(index, 1);
        li.remove();
      }
      localStorage.setItem("arr", JSON.stringify(toDoData));
      renderToDo();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  let valueInput = trim(headerInput.value);

  newToDo = {
    text: valueInput,
    completed: false,
  };

  if (valueInput !== "" && !Number(valueInput)) {
    toDoData.push(newToDo);
    headerInput.value = "";
    localStorage.setItem("arr", JSON.stringify(toDoData));
  }

  renderToDo();
});

if (toDoData && localStorage.getItem("arr")) {
  renderToDo();
}
