import { TODOS_STORAGE_KEY } from "./constants.js";
import { createTodosModel } from "./model.js";
import { createStorage } from "./storage.js";
import { createView } from "./view.js";


const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('.js-output');
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
   model.update(todos); 
   view.render(model.get());
});

btnNode.addEventListener('click', function() {
    const todo = {
        title: inputNode.value,
        status: "active"   
     };
    model.add(todo);
    view.render(model.get());
    storage.push(todo);
});

btnClearNode.addEventListener('click', function() {
    model.clear();

    view.render(model.get());
    storage.push(model.get());
})
