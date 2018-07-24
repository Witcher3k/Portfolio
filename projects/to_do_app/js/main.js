let deleteSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 408.483 408.483"
                            xml:space="preserve">

                            <g>
                                <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
                                />
                                <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
                                />
                            </g>
                        </svg>`;

let completeSVG = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                            <polygon points="202.624,478.016 0,291.36 70.512,214.8 191.968,326.656 431.44,33.984 512,99.904 " />
                        </svg>`;





let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
}
let exectude = false;

renderToDoList();

document.getElementById("add").onclick = function () {
    const value = document.getElementById("activity").value;

    if (value !== "") {
        data.todo.push(value);
        addItem(value);
    } else {
        window.alert("You must type value!");
    }
}
document.getElementById('activity').addEventListener('keydown', function (e) {


    if (e.code === 'Enter') {
        const value = document.getElementById("activity").value;

        if (value !== "") {
            data.todo.push(value);
            addItem(value);
        } else {
            window.alert("You must type value!");
        }
    }
});




function addItem(text, completed) {

    if (!exectude) {
        exectude = true;

        let list = document.createElement('ul');
        list.classList.add('list');
        list.id = 'completed';

        let main = document.querySelector('main');
        main.appendChild(list);

    }

    let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.addEventListener('click', removeItem);
    remove.classList.add('delete');
    remove.innerHTML = deleteSVG;

    let complete = document.createElement('button');
    complete.addEventListener('click', completeItem);
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(buttons);

    list.appendChild(item);

    dataObjectUpdated()

}

function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let parentID = parent.id;
    let value = item.innerText;

    if (parentID == 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    console.log(data);
    parent.removeChild(item);

    dataObjectUpdated()
}

function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let target;
    let value = item.innerText;
    if (id === 'todo') {
        target = document.getElementById('completed');

        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);

    } else {
        target = document.getElementById('todo');
        data.completed.splice(data.todo.indexOf(value), 1);
        data.todo.push(value);
    }


    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);


    dataObjectUpdated();

}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
    console.log(JSON.stringify(data));
}

function renderToDoList() {
    if (!data.todo.length && !data.completed.length) {
        console.log('pusto');
    }
    for (let index = 0; index < data.todo.length; index++) {
        const element = data.todo[index];
        addItem(element, false);

    }
    for (let index = 0; index < data.completed.length; index++) {
        const element = data.completed[index];
        addItem(element, true);
    }
}