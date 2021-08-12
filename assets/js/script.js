var taskIdCounter = 0
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
// create list item
    var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
    
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    
    //create div to hold task info and to list item
    var taskInfoE1 = document.createElement("div");
    taskInfoE1.className = "task-info";
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoE1);
    
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);
    
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}; 

var createTaskAction = function(taskId) {
    var actionContainerEl = document.createElement("div");
     actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonE1 = document.createElement("button");
     editButtonE1.textContent = "Edit";
        editButtonE1.className = "btn edit-btn";
        editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonE1);

    //create delet button
     var deleteButtonE1 = document.createElement("button");
        deleteButtonE1.textContent = "Delete";
        deleteButtonE1.className = "btn delete-btn";
         deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");
        statusSelectE1.className = "select-status";
        statusSelectE1.setAttribute("name", "status-change");
        statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // optoion element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value" , statusChoices[i]);

        statusSelectE1.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(targetEl);
    }
};

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskNmae;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + "']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);



    
    