const taskList = document.getElementById("task-list");
const addButton = document.getElementById("button");
const taskInput = document.getElementById("search");
const resetButton = document.getElementById("reset");

// Function to save tasks to localStorage for the logged-in user
function saveTasks() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const tasks = Array.from(taskList.children).map((task) => task.textContent);
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
  }
}

// Function to load tasks from localStorage for the logged-in user
function loadTasks() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const tasks =
      JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }
}

// Create task element with properties from renderTask
function createTaskElement(taskText) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-9";

  const card = document.createElement("div");
  card.className = "d-flex justify-content-between align-items-center";
  card.style.backgroundColor = "white";
  card.style.borderRadius = "10px";
  card.style.padding = "10px";
  card.style.margin = "10px";
  card.style.boxShadow = "0px 0px 5px rgba(0,0,0,0.2)";
  card.style.minWidth = "80px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";

  // Handle checkbox change
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      card.style.backgroundColor = "rgba(181, 236, 181, 0.498)";
      label.style.textDecoration = "line-through";
    } else {
      console.log("Checkbox is unchecked");
      card.style.backgroundColor = "white";
      label.style.textDecoration = "";
    }
  });

  const label = document.createElement("label");
  label.textContent = taskText;

  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  const editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen-to-square";
  editIcon.style.cursor = "pointer";
  editIcon.style.fontSize = "1.5rem"; // Adjust icon size
  editIcon.style.marginRight = "7px"; // Push the icon to the right

  // Hover effect on trash icon
  editIcon.addEventListener("mouseover", function () {
    editIcon.style.color = "blue";
    editIcon.style.transform = "scale(1.2)";
  });

  // Reset icon color on mouse out
  editIcon.addEventListener("mouseout", function () {
    editIcon.style.color = ""; // Reset the color
    editIcon.style.transform = ""; // Reset the scale
  });

  

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.fontSize = "1.5rem"; // Adjust icon size
  deleteIcon.style.marginLeft = "auto"; // Push the icon to the right

  // Hover effect on trash icon
  deleteIcon.addEventListener("mouseover", function () {
    deleteIcon.style.color = "rgb(211, 125, 125)";
    deleteIcon.style.transform = "scale(1.2)";
  });


  // to bring it down 
  // Reset icon color on mouse out
  deleteIcon.addEventListener("mouseout", function () {
    deleteIcon.style.color = ""; // Reset the color
    deleteIcon.style.transform = ""; // Reset the scale
  });

  div1.appendChild(checkbox);
  div1.appendChild(label);

  div2.appendChild(editIcon);
  div2.appendChild(deleteIcon);

  card.appendChild(div1);
  card.appendChild(div2);

  cardWrapper.appendChild(card);
  taskList.appendChild(cardWrapper);

  // Delete task from localStorage and UI
  deleteIcon.addEventListener("click", function () {
    cardWrapper.remove();
    const tasks = Array.from(taskList.children).map((task) => task.textContent);
    const updatedTasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem(
      `tasks_${localStorage.getItem("currentUser")}`,
      JSON.stringify(updatedTasks)
    );
  });



  // edit icon functionality 
  // 1. the selected icon will also be displayed on the main one
  // 2. now after selecting allow the user to edit in the input box and after entering it should save in the label.textContent 
  editIcon.addEventListener('click', function(){
    // Populate input field with the current task text
  taskInput.value = label.textContent; 

    addButton.textContent = "Update"; // Change the button text to "Update"
  
    // Save the task being edited for reference
    taskInput.setAttribute('data-editing', taskText);

  })


  // Handle checkbox change (optional visual changes)
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
    } else {
      label.style.textDecoration = "";
    }
  });


 
}

// Add event listener for the add button
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const task = taskInput.value.trim();
  
  if (task) {
    if (addButton.textContent === "Update") {
      // Find the task being edited and update it
      const editingTask = taskInput.getAttribute('data-editing');
      
      // Update the UI label
      const taskLabels = Array.from(taskList.getElementsByTagName('label'));
      const targetLabel = taskLabels.find(label => label.textContent === editingTask);
      if (targetLabel) {
        targetLabel.textContent = task; // Update the label text
      }

      // Update tasks in localStorage
      const tasks = Array.from(taskList.children).map(task => task.textContent);
      localStorage.setItem(`tasks_${localStorage.getItem("currentUser")}`, JSON.stringify(tasks));

      // Reset input and button
      taskInput.removeAttribute('data-editing');
      addButton.textContent = "Add";
    } else {
      // Normal add functionality
      createTaskElement(task);
      saveTasks();
    }

    taskInput.value = ""; // Clear the input field
  }
});


// Handle reset button click (clear all tasks from UI and localStorage for current user)
resetButton.addEventListener("click", () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    localStorage.removeItem(`tasks_${currentUser}`);
    taskList.innerHTML = "";
  }
});

// Load tasks from localStorage on page load for the current user
window.addEventListener("load", loadTasks);
