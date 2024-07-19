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

function arrayDistributor() {
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

function getValue(id) {
  return document.getElementById(id).value;
}

// Originale postTask Funktion von Mario
// async function postTask() {
//   let assigned = document.getElementById("assigned").value;
//   let subtask = subtasks;
//   let prio = currentPriority;

//   let extractedData = {
//     title:  getValue("title"),
//     description: getValue("assigned"),
//     assigned: assigned,
//     date: getValue("date"),
//     category: getValue("category"),
//     subtask: subtask,
//     prio: prio,
//   };

//   await postData("/tasks", extractedData);
// }
















// Diese Funktion generiert eine random Nummer. Ist für das Drag and Drop System notwendig!
function generateNumericRandomId(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}
let numericRandomId = generateNumericRandomId(8); // Generiert eine zufällige ID mit 8 Zahlen
let numericIdAsNumber = parseInt(numericRandomId, 10);

// Neue AddTask funktion für das board -> muss noch etwas bearbeitet werden
// Für die zugewiesene ID muss man sich glaube ich noch was anderes überlegen!
async function postTask() {
  let prio = currentPriority;
  let extractedData = {
    id: numericIdAsNumber,
    taskBar: 0,
    taskContacts: assignedPersons,
    taskDate: getValue("date"),
    taskDescription: getValue("description"),
    taskPrioAlt: prio,
    taskPrioImage: '',
    taskStatus: 'toDo',
    taskSubtaskAmount: `${subtasksAt.length}`,
    taskSubtasksDone: '0',
    taskTitle: getValue("title"),
    taskType: getValue("category"),
  };
  await postData("/tasks", extractedData);
};


















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