let input_new_task = document.querySelector("#input-name-task");
let button_add_task = document.querySelector("#button-add-task");
let list_tasks = document.querySelector("#list-tasks");
let button_window_close = document.querySelector("#button-window-close");
let button_update_task = document.querySelector("#button-update-task");
let window_edit = document.querySelector("#window-edit");
let window_edit_background = document.querySelector("#window-edit-background");
let id_task_edit = document.querySelector("#id-task-edit");
let new_name_task = document.querySelector("#input-new-name-task");


input_new_task.addEventListener('keypress', (e) => {
    if(e.keyCode == 13){
        let task = {
            name: input_new_task.value,
            id: gerarId(),
        
        }
        addTask(task);

        // Adicionar a tarefa ao HTML
    }
});

button_window_close.addEventListener("click", (e) => {
    alterWindowEdition();
});

button_update_task.addEventListener('click', (e) => {
    e.preventDefault();

    let id_task = id_task_edit.innerHTML.replace("#",'');
    let task = {
        name: new_name_task.value,
        id: id_task

    }

    let currently_task = document.getElementById('' + id_task + '');

    if(currently_task) {
        let li = createTagLi(task);
        list_tasks.replaceChild(li, currently_task);
        alterWindowEdition();
    }else{
        alert("Elemento HTML não encontrado!");
    }
    
});


button_add_task.addEventListener("click", (e) => {
    let task = {
        name: input_new_task.value,
        id: gerarId(),
    }
    addTask(task);

})

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function addTask(task){
    let li = createTagLi(task);
    list_tasks.appendChild(li);
    input_new_task.value = '';
}

function createTagLi(task){
    let li = document.createElement('li');
    li.id = task.id; 

    let span = document.createElement("span");
    span.classList.add('text-task');
    span.innerHTML = task.name;

    let div = document.createElement("div");

    let button_edit = document.createElement('button');
    button_edit.classList.add("button-action");
    button_edit.innerHTML = '<i class="fa fa-pencil"></i>';
    button_edit.setAttribute("onclick", "edit("+task.id+")");

    let button_delete = document.createElement('button');
    button_delete.classList.add("button-action");
    button_delete.innerHTML = '<i class="fa fa-trash"></i>';
    button_delete.setAttribute("onclick", "del("+task.id+")")

    div.appendChild(button_edit);
    div.appendChild(button_delete);

    li.appendChild(span);
    li.appendChild(div);
    return li;

}

function edit(id){
    let li = document.getElementById('' + id + '');
    if(li) {
        id_task_edit.innerHTML = "#" + id;
        new_name_task.value = li.innerText;
        alterWindowEdition();
    }else{
        alert("Elemento HTML não encontrado!");
    }
}

function del(id){
    let confirm = window.confirm("Tem certeza que deseja excluir");
    if(confirm) {
        let li = document.getElementById('' + id +'');
        if(li){
            list_tasks.removeChild(li);
        }else{
            alert("Elemento HTML não encontrado!");
        }

    }
}

function alterWindowEdition() {
    window_edit.classList.toggle('open');
    window_edit_background.classList.toggle('open');
    
}
