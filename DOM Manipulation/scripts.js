function addTask(){
    var input = document.getElementById('taskInput').value;
    var todoList = document.getElementById('todoList');
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    
    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";
    
    
    if(input == ""){
        alert("Please insert a task to add to the to-do list");
        return;
    }
    
    console.log("The user's input is: " + input);
    
    //create a new li element in the html document
    var newListItem = document.createElement("li");
    
    //craete a span element for the task text, this will hold the actual text
    var taskSpan = document.createElement("span");
    
    taskSpan.innerText = input;   
    
    //append the new item to the span element, not deleting any old data just inserting new
    //and then appends the entire item(newListItem) to todoList
    newListItem.appendChild(taskSpan);
    newListItem.appendChild(editButton);
    newListItem.appendChild(deleteButton);
    deleteButton.onclick = function(){newListItem.remove();};
    editButton.onclick = function(){
        editTask(taskSpan);
    };
    
    //appends the li to the ul list
    todoList.appendChild(newListItem);
    
    document.getElementById('taskInput').value = '';
}

function editTask(taskSpan){
    var newInput = prompt("Please insert a new value: ");
    //console.log("The new task after the edit is: " + newInput);
    
    if(newInput.trim() == ""){
        alert("Please enter a text to replace the to-do task");
        return;
    }
    
    taskSpan.textContent = newInput;
    console.log("The new task after the edit is: " + newInput);
}