'use strict';

// get DOM elements
const itemInput = document.querySelector("#inputNewToDo");
const clearButton = document.querySelector('.clear');
const saveButton = document.querySelector('.save-button');
const inputButton = document.querySelector(".save");
const ul = document.querySelector(".todo-list");
const input = document.getElementById('inputNewToDo');
const addIcon = '<i class="fas fa-plus" style="color: white;"></i> ';

// variables
const checked = "fa-check-circle";
const unchecked = "fa-circle";
let id = 0;

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}

//insert icon before input
input.insertAdjacentHTML('beforebegin', addIcon);

function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

let app = {
  todos: [],
  todoItem: {
    content: "", id: id, done: false
  },
  addItem: function(item) {    
    ul.innerHTML = "";
    let task = Object.create(this.todoItem);
    task.content = item;
    task.id = id++; // every time addItem runs, the id variable is incremented to match index of todos array
    task.done = false;
    if (item) { //makes sure input is not blank
      this.todos.push(task);
      this.displayList(); // refreshes list
    } else { alert("A todo item can not be blank!") };
    itemInput.value = ""; // clears out input box
  },
  displayList: function() {
    this.todos.forEach(item => {
      let returnChecked = () => { // function for returning proper class name of (un)checked depending on done property of todos array item
        if (!item.done) {
          return unchecked;
        } else return checked;
      };
      // for each to do item, display it as a li bound to an object inside of todos array
      let text = `<li><i id="${item.id}" class="checkbox far ${returnChecked()}"></i><span> ${sanitizeString(item.content)}</span></li>`;
      ul.insertAdjacentHTML("beforeend", text)
    });
  },
  clearList: function() {
    ul.innerHTML = '';
    id = 0; // resets id var to 0 to match index of new array items created after clearing
    this.todos = []; // clears out items in logic layer
  }
}

document.addEventListener('click', function(event) {
  const element = event.target;
  if (element && element.classList.contains("checkbox")) {
    element.classList.toggle(checked);
    element.classList.toggle(unchecked);
    app.todos[element.id].done = false ? false : true;
  }
});


clearButton.addEventListener('click', function() {
  app.clearList();
});

saveButton.addEventListener('click', function() {
  app.addItem(itemInput.value)
});


document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) { // if user presses enter key, add in a new todo item
    app.addItem(itemInput.value)
  }
});