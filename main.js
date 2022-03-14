const add = document.querySelector(".btn-primary")
const input = document.querySelector(".form-control")
const tbody = document.querySelector(".tb")
const save = document.querySelector(".save")
const deleteAll = document.querySelector(".btn-secondary")
const searchEl = document.querySelector(".btn-success")
const sortEl = document.querySelector(".btn-danger")


let tasks = getTaskFromLocalStorage()
rededTask(tasks)
add.addEventListener('click', () => {
    const El = input.value.trim()
    let tasks = getTaskFromLocalStorage()
    if(!El)
    {
        alert("error")
        return
    }else if(tasks.includes(El))
    {
        alert("Ten dã tồn tại")
        return
    }

    tasks.push(El)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    input.value = ' '
    input.focus()
    rededTask(tasks)
})

function deleteElement(index){
if(confirm('Are you sure ?')){
    let tasks = getTaskFromLocalStorage()
    tasks.splice(index,1)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    rededTask(tasks)
}
}
function editElement(index){
let tasks = getTaskFromLocalStorage();
add.classList.add('active');
save.classList.add('active');

if(tasks.length > 0){
    input.value = tasks[index]
    save.setAttribute('id',index)
}
}
save.addEventListener('click',()=>{
let taskId = save.getAttribute('id')
let task = getTaskFromLocalStorage()
if(taskId === 0 || taskId) {
    task[taskId] = input.value
}

localStorage.setItem('tasks', JSON.stringify(task));
add.classList.remove('active');
save.classList.remove('active');
input.value = '';
input.focus();
rededTask(task);
})

deleteAll.addEventListener('click',()=>{
    let tasks = []
    rededTask(tasks)
    localStorage.setItem('tasks',JSON.stringify(tasks))
})
searchEl.addEventListener('click',() =>{
    let tasks = getTaskFromLocalStorage()
    if(tasks.includes(input.value)){
        tasks =[]
        tasks.push(input.value)
    }
    localStorage.setItem('tasks',JSON.stringify(tasks))
    input.value = ' '
    input.focus()
    rededTask(tasks)
})
sortEl.addEventListener('click',() =>{
    let tasks = getTaskFromLocalStorage()
    tasks.sort()
    localStorage.setItem('tasks',JSON.stringify(tasks))
    input.value = ' '
    input.focus()
    rededTask(tasks)
})

function rededTask(tasks){
    let count = 1
    let html =''
    tasks.forEach((name,index) =>{
        html +=`<tr>
            <th scope = "row">${count++}</th>
            <td>${name}</td>
            <td>
            <div style = "text-align:center">
                <button type="button" class="btn btn-info edit" onclick="editElement(${index})" >Edit</button>
                <button type="button" class="btn btn-danger delete" onclick="deleteElement(${index})">Delete</button>
            </div>
            </td>
        </tr>`
    })
    tbody.innerHTML = html
}

function getTaskFromLocalStorage(){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}
