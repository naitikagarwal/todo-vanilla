document.addEventListener('DOMContentLoaded', () => {

var todoInput = document.getElementById("todo-input")
const addTaskBtn = document.getElementById("add-task")
const todoList = document.getElementById("todo-list")

let tasks =JSON.parse(localStorage.getItem("tasks"))  || [];

tasks.forEach((task) => renderTask(task));
addTaskBtn.addEventListener('click', () =>{
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed : false,
    }
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value ="";
    
    console.log(tasks);
    })

    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id)
        li.innerHTML = `<span>${task.text}</span>
                <button id ="del">Delete</button>`;
        todoList.appendChild(li);
        li.addEventListener("click", (e) =>{
            if(e.target.tagname ==='BUTTON') return;
            li.classList.toggle('completed')

            task.completed =! task.completed;
            saveTask();
        })
        li.querySelector('button').addEventListener('click', (e) =>{
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id );
            li.remove()
            saveTask()
        })


    }
    
    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        alert("hi")
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-task").click();
}
}
    
)
