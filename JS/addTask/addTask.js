let subtasks = [];
let assignedPersons = [];
let foundPersons = [];

function showPersonsAt() {
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  if (dropDown.classList.contains("hide")) {
    rotate.classList.add("rotated");
    dropDown.classList.remove("hide");
  } else {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  }
} 

function renderAssignedListAt(){
  let dropDownList = document.getElementById('dropdown-list');
  if (foundPersons && foundPersons.length > 0) {
    dropDownList.innerHTML = personsFoundPostAt();
  } else {
    dropDownList.innerHTML = dropDownListSampleAt();
  }
}

function sortContactsAt() {
  contactsAt.sort((a, b) => a.name.localeCompare(b.name));
}

function renderEmblemAt(name) {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials;
}

function addAssignedPersonAt(i){
  checkboxSwapAt(i);
  checkIfExistAt(i);
  postPersonsAt();
}

function checkboxSwapAt(i){
  let container = document.getElementById(`persons-assignemend${i}`);
  let checkbox = document.getElementById(`checkbox${i}`);
  let assignedName = document.getElementById(`assigned-name${i}`);

  if (!container.classList.contains('persons-assignemend-checkt')) {
    addCheckboxAt(container, checkbox, assignedName);
  }else{
    removeCheckboxAt(container, checkbox, assignedName);
  }
}

function addCheckboxAt(container, checkbox, assignedName){
  container.classList.add('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_checkt.png';
  assignedName.classList.add("assigned-color");
}

function removeCheckboxAt(container, checkbox, assignedName){
  container.classList.remove('persons-assignemend-checkt');
  checkbox.src = './img/checkbox_uncheckt.png';
  assignedName.classList.remove("assigned-color");
}

function checkIfExistAt(i) {
  let container = document.getElementById(`persons-assignemend${i}`);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (!assignedPersons.includes(contactsAt[i])) {
      assignedPersons.push(contactsAt[i]);
    }
  } else {
    let index = assignedPersons.indexOf(contactsAt[i]);
    if (index > -1) {
      assignedPersons.splice(index, 1);
    }
  }
}

function postPersonsAt(){
  let assignedPersonsResults = document.getElementById('assigned-persons');
 
  assignedPersonsResults.innerHTML = '';
  assignedPersonsResults.innerHTML += assignedResultsAt();
}

function searchPersonAt(){
  let input = document.getElementById('assigned').value.trim().toLowerCase();

  if (input.length > 2) {
    openListAt(input);
    personsControlAt(input);
    personsFoundPostAt(foundPersons);
  } else {
    foundPersons = '';
    renderAssignedListAt();
  }
}

function personsControlAt(input){
  foundPersons = []; // Reset foundPersons array
  let addedNames = new Set(); // Track added names to avoid duplicates

  for (let i = 0; i < contactsAt.length; i++) {
    let person = contactsAt[i];
    if (person.name.toLowerCase().includes(input)) {
      if (!addedNames.has(person.name)) {
        foundPersons.push(person);
        addedNames.add(person.name); // Add name to the set
      }
    }
  }
}

function checkIfFoundExistAt(i) {
  let container = document.getElementById(`persons-assignemend${i}`);

  if (container.classList.contains('persons-assignemend-checkt')) {
    if (!assignedPersons.includes(foundPersons[i])) {
      assignedPersons.push(foundPersons[i]);
    }
  } else {
    let index = assignedPersons.indexOf(foundPersons[i]);
    if (index > -1) {
      assignedPersons.splice(index, 1);
    }
  }
}

function addFoundPersonAt(i){
  checkboxSwapAt(i);
  checkIfFoundExistAt(i);
  postPersonsAt(); 
}

function openListAt(input){
  let rotate = document.getElementById("rotate");
  let dropDown = document.getElementById("dropdown-list");

  if (input.length == 0) {
    rotate.classList.remove("rotated");
    dropDown.classList.add("hide");
  } else {
    rotate.classList.add("rotated");
    dropDown.classList.remove("hide");
    renderAssignedListAt();
  }
}

function setPriorityAt(priority) {
  let priorities = {
    urgent: document.getElementById("urgent"),
    medium: document.getElementById("medium"),
    low: document.getElementById("low"),
  };

  for (let key in priorities) {
    priorities[key].style.backgroundColor =
      key === priority ? getColorAt(priority) : "";
    priorities[key].style.color = key === priority ? "#FFFFFF" : "";
  }

  currentPriority = priority;
}

function getColorAt(priority) {
  switch (priority) {
    case "urgent":
      return "#FF3D00";
    case "medium":
      return "#FFA800";
    case "low":
      return "#7AE229";
    default:
      return "";
  }
}

function setBgImgAt(priority) {
  let images = {
    urgent: document.getElementById("activeUrg"),
    medium: document.getElementById("activeMed"),
    low: document.getElementById("activeLow"),
  };

  for (let key in images) {
    images[key].src =
      key === priority ? getActiveImgAt(priority) : getInactiveImgAt(key);
  }
}

function getActiveImgAt(priority) {
  switch (priority) {
    case "urgent":
      return "/img/urgent-prio-icon-active.svg";
    case "medium":
      return "/img/medium-prio-icon-active.png";
    case "low":
      return "/img/low-prio-icon-active.png";
    default:
      return "";
  }
}

function getInactiveImgAt(priority) {
  switch (priority) {
    case "urgent":
      return "/img/urgent-prio-icon-inactive.png";
    case "medium":
      return "/img/medium-prio-icon-inactive.png";
    case "low":
      return "/img/low-prio-icon-inactive.png";
    default:
      return "";
  }
}

function addUrgentAt() {
  setPriorityAt("urgent");
  setBgImgAt("urgent");
}

function addMediumAt() {
  setPriorityAt("medium");
  setBgImgAt("medium");
}

function addLowAt() {
  setPriorityAt("low");
  setBgImgAt("low");
}

function addSubtaskAt() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");

  plusIcon.classList.add("hide");
  hidenContainer.classList.remove("hide");
}

function closeSubtaskAt() {
  let plusIcon = document.getElementById("addSubtaskIcon");
  let hidenContainer = document.getElementById("addRemoveContainer");
  let subtask = document.getElementById("subtask");

  plusIcon.classList.remove("hide");
  hidenContainer.classList.add("hide");
  subtask.value = "";
}

function aproveSubtaskAt() {
  let subtask = document.getElementById("subtask");

  if (!subtask.value.trim()) {
    alert("Please fill in your Subtask");
  } else {
    subtasks.push(subtask.value);
    subtask.value = "";
    postSubtaskAt();
  }
}

function postSubtaskAt() {
  let subtaskDisplay = document.getElementById("subtaskDisplay");

  subtaskDisplay.innerHTML = "";
  subtaskDisplay.innerHTML += subtaskSampleAt();
}

function editSubtaskAt(element) {
  let listItem = element.closest(".listItem");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  subtaskSpan.outerHTML = `<input value="${subtaskText}">`;

  swapToEditAt(listItem);
}

function cancelEditAt(element) {
  let listItem = element.closest(".listItem");
  let inputElement = listItem.querySelector("input");
  let subtaskText = inputElement ? inputElement.value.trim() : "";
  if (inputElement) {
    inputElement.outerHTML = `<span class="subtask-text">${subtaskText}</span>`;
  }
  swapToNormalAt(listItem);
}

function deleteSubtaskAt(element) {
  let listItem = element.closest(".listItem");
  let subtaskSpan = listItem.querySelector(".subtask-text");
  let subtaskText = subtaskSpan.textContent.trim();
  let index = subtasks.indexOf(subtaskText);
  if (index !== -1) {
    subtasks.splice(index, 1);
  }

  listItem.remove();
}

function swapToEditAt(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.add("hide");
  editing.classList.remove("hide");
}

function swapToNormalAt(listItem) {
  let edit = listItem.querySelector("[id^=editContainer]");
  let editing = listItem.querySelector("[id^=addRemoveContainerEdit]");
  edit.classList.remove("hide");
  editing.classList.add("hide");
}

function approveEditAt(element) {
  let listItem = element.closest(".listItem");
  let inputElement = listItem.querySelector("input");
  let newSubtaskText = inputElement.value.trim();

  let oldSubtaskText = subtasks.find(
    (subtask) => subtask === inputElement.defaultValue
  );
  let index = subtasks.indexOf(oldSubtaskText);
  if (index !== -1) {
    subtasks[index] = newSubtaskText;
  }

  inputElement.outerHTML = `<span class="subtask-text">${newSubtaskText}</span>`;

  swapToNormalAt(listItem);
}

/*the following functions must be used for the board.html and addTasks.html */

function openAddTask() {
  let card = document.querySelector(".add-task-popup");
  let overlay = document.getElementById("overlay");

  renderAssignedListAt();
  swapToPopup();
  hideOverflow();
  card.style.display = "block";
  overlay.classList.add("overlay");
}

function swapToPopup() {
  document.getElementById("add-task-position").className =
    "add-task-popup-position";
  document.getElementById("add-task-card").style.backgroundColor = "white";
  document.getElementById("close-popup").classList.remove("hide");
}

function hideOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "hidden";
}

function closeAddTask() {
  let addTask = document.getElementById("add-task-position");
  if (addTask.classList.contains("add-task-popup-position")) {
    closeAddTaskPopup();
  } else {
    location.reload();
  }
}

function closeAddTaskPopup() {
  let card = document.querySelector(".add-task-popup");
  let overlay = document.getElementById("overlay");

  card.style.animation = "fly-out 0.1s forwards";
  overlay.style.animation = "fade-out 0.2s forwards";
  setTimeout(() => {
    card.style.animation = ``;
    overlay.style.animation = ``;
    overlay.classList.remove("overlay");
    card.style.display = "none";
    showOverflow();
  }, 200);
}

function showOverflow() {
  let boardBodyContainer = document.querySelector(".boardBodyContainer");
  boardBodyContainer.style.overflow = "";
}

/*Firebase functions*/
let currentPriority = "";

const BASE_URL =
  "https://join-248-default-rtdb.europe-west1.firebasedatabase.app/";

let firebaseData = [];
let firebaseContacts = [];
let firebaseTasks = [];
let firebaseUsers = [];
/*This function fetches the url with the apropriate path given
    and pushes them in to the array with the name 'firebaseData' 
    then everyone can make a function that takes the data from the data array*/
async function loadUrl(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let dataKeyArray = Object.keys(responseToJson);
  for (let i = 0; i < dataKeyArray.length; i++) {
    firebaseData.push({
      id: dataKeyArray[i],
      dataExtracted: responseToJson[dataKeyArray[i]],
    });
  }
  arrayDistributor();
}

function arrayDistributor(){
  firebaseContacts.push(firebaseData[0]);
  firebaseTasks.push(firebaseData[1]);
  firebaseUsers.push(firebaseData[2]);
}

async function postData(path = "", data) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

function getValue(id){
  return document.getElementById(id).value;
}

async function postTask() {
  let assigned = document.getElementById("assigned").value;
  let subtask = subtasks;
  let prio = currentPriority;

  let extractedData = {
    title:  getValue("title"),
    description: getValue("assigned"),
    assigned: assigned,
    date: getValue("date"),
    category: getValue("category"),
    subtask: subtask,
    prio: prio,
  };

  await postData("/tasks", extractedData);
}

async function addNewContact() {
  let extractedData = {
    name: getValue("contactNewName"),
    email: getValue("contactNewMail"),
    phone: getValue("contactNewPhone"),
  };

  await postData("/contacts", extractedData);
}

async function addNewUser() {
  let extractedData = {
    username: getValue("signUpName"),
    email: getValue("signUpEmail"),
    password: getValue("signUpPassword"),
    passwordCheck: getValue("signUpPasswordCheck"),
  };

  await postData("/users", extractedData);
}