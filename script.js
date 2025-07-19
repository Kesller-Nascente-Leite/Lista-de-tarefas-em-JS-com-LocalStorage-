
const inputEl = document.querySelector('#to-do');
const saveBtn = document.querySelector('#saved');
const messageEl = document.querySelector('#msg');
const listContainer = document.querySelector('#toDoList');
document.addEventListener('DOMContentLoaded', showToDoList);
saveBtn.addEventListener('click', () => {
    const text = inputEl.value.trim();
    if (!text) {
        showMsg('Please enter a valid To‑Do item.');
        return;
    }

    const todos = JSON.parse(localStorage.getItem('toDoList')) || [];
    todos.push({ text, done: false });
    localStorage.setItem('toDoList', JSON.stringify(todos));

    inputEl.value = '';
    showMsg('To‑Do item saved successfully!');
    showToDoList();
});
function showToDoList() {
    listContainer.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('toDoList')) || [];

    todos.forEach((item, index) => {

        const li = document.createElement('li');
        li.textContent = item.text;
        li.classList.toggle('done', item.done);

        const btnDel = document.createElement('button');
        btnDel.textContent = '✕';
        btnDel.classList.add('btn-del');
        btnDel.addEventListener('click', () => deleteToDo(index));

        li.addEventListener('click', () => toggleDone(index));

        li.appendChild(btnDel);
        listContainer.appendChild(li);
    });
}
function showMsg(msg) {
    messageEl.textContent = msg;
    setTimeout(() => messageEl.textContent = '', 2000);
}
function deleteToDo(idx) {
    const todos = JSON.parse(localStorage.getItem('toDoList')) || [];
    todos.splice(idx, 1);
    localStorage.setItem('toDoList', JSON.stringify(todos));
    showToDoList();
}
function toggleDone(idx) {
    const todos = JSON.parse(localStorage.getItem('toDoList')) || [];
    todos[idx].done = !todos[idx].done;
    localStorage.setItem('toDoList', JSON.stringify(todos));
    showToDoList();
}