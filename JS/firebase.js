/**
 * Base URL for Firebase Database.
 * @constant {string}
 */
const BASE_URL = "https://join-248-default-rtdb.europe-west1.firebasedatabase.app/";

let currentPriority = "";
let currentUser = [];
let firebaseData = [];
let firebaseContacts = [];
let firebaseTasks = [];
let firebaseUsers = [];

/**
 * Fetches data from Firebase Database and distributes it to corresponding arrays.
 * @async
 * @param {string} [path=""] - The path to fetch data from.
 * @returns {Promise<void>}
 */
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

/**
 * Distributes fetched Firebase data to contacts, tasks, and users arrays.
 */
function arrayDistributor() {
  firebaseContacts.push(firebaseData[0]);
  firebaseTasks.push(firebaseData[1]);
  firebaseUsers.push(firebaseData[2]);
}

/**
 * Posts data to Firebase Database.
 * @async
 * @param {string} [path=""] - The path to post data to.
 * @param {Object} data - The data to be posted.
 * @returns {Promise<Object>} - The response from the server.
 */
async function postData(path = "", data) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Patches data to Firebase Database.
 * @async
 * @param {string} [path=""] - The path to patch data to.
 * @param {Object} data - The data to be patched.
 * @returns {Promise<Object>} - The response from the server.
 */
async function patchData(path = "", data) {
  let response = await fetch(BASE_URL + path + ".json", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Gets the value of an HTML element by its ID.
 * @param {string} id - The ID of the HTML element.
 * @returns {string} - The value of the HTML element.
 */
function getValue(id) {
  return document.getElementById(id).value;
}

/**
 * Generates a random numeric ID of a specified length.
 * @param {number} length - The length of the numeric ID.
 * @returns {string} - The generated numeric ID.
 */
function generateNumericRandomId(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

let numericRandomId = generateNumericRandomId(8);
let numericIdAsNumber = parseInt(numericRandomId, 10);

/**
 * Posts a new task to Firebase Database.
 * @async
 * @param {Event} event - The event object.
 * @returns {Promise<void>}
 */
async function postTask(event) {
  event.preventDefault();
  requiredCheck();
  if (!inputCheck()) {
    return;
  }
  let taskPrioImageUrl = '';
  if (currentPriority === 'medium') {
    taskPrioImageUrl = './img/medium-prio-icon-inactive.png';
  }
  if (currentPriority === 'low') {
    taskPrioImageUrl = './img/low-prio-icon-inactive.png';
  }
  if (currentPriority === 'urgent') {
    taskPrioImageUrl = './img/urgent-prio-icon-inactive.png';
  }
  let taskMoreContacts = `+${assignedPersons.length - 6}`;
  if (assignedPersons.length < 7) {
    taskMoreContacts = '';
  }
  let prio = currentPriority;
  let extractedData = {
    id: numericIdAsNumber,
    taskBar: 0,
    taskContacts: assignedPersons,
    taskContactsMore: `${taskMoreContacts}`,
    taskDate: getValue('date'),
    taskDescription: getValue('description'),
    taskPrioAlt: prio,
    taskPrioImage: taskPrioImageUrl,
    taskStatus: 'toDo',
    taskSubtaskAmount: `${subtasksAt.length}`,
    taskSubtasks: subtasksAt,
    taskSubtasksDone: '',
    taskSubtasksSelected: '',
    taskTitle: getValue('title'),
    taskType: getValue('category'),
  };

  await postTaskConfirmation();
  await postData("/tasks", extractedData);
}

/**
 * Adds a new contact to Firebase Database.
 * @async
 * @returns {Promise<void>}
 */
async function addNewContact() {
  let extractedData = {
    name: getValue("contactNewName"),
    email: getValue("contactNewMail"),
    phone: getValue("contactNewPhone"),
  };

  await patchData("", extractedData);
}
