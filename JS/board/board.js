let tickets = [
    // 0
    {
        "id": 0,
        "taskType": 'toDo0',
        "taskTitel": 'Kochwelt Page & Recipe Recommender',
        "taskDescription": 'Build start page with recipe recommendation Build start page with recipe recommendation',
        "taskBar": 50,
        "taskSubtaskAmount": 1,
        "taskContacts": ["Emmanuel Mauer", "Marcel Bauer", "Anton Mayer"],
        "taskPrioImage": './img/board/prio_high.png',
        "taskPrioAlt": 'High',
        "taskStatus": 'toDo',
    },
    //1
    {
        "id": 1,
        "taskType": 'InProgress1',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'inProgress'
    },
    //2
    {
        "id": 2,
        "taskType": 'awaitFeedback2',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'awaitFeedback'
    },
    //3
    {
        "id": 3,
        "taskType": 'done3',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'done'
    },
];

let currentDraggedElement;

function formatContacts(contacts) {
    return contacts.map(contact => {
        let [firstName, lastName] = contact.split(' ');
        return `<div class="taskContact">${firstName[0]}${lastName[0]}</div>`;
    }).join('');
}

// Original renderTickets funktion
// function renderTickets(columnId, status) {
//     let columnElement = document.getElementById(columnId);
//     columnElement.innerHTML = ``;
//     tickets.forEach(ticket => {
//         if (ticket.taskStatus === status) {
//             const formattedContacts = formatContacts(ticket.taskContacts);
//             columnElement.innerHTML += ticketTemplate(ticket, formattedContacts);
//         }
//     });
// }


function renderTickets(columnId, status) {
    let columnElement = document.getElementById(columnId);

    if (!columnElement) {
        console.error(`Element with id ${columnId} not found.`);
        return;
    }

    columnElement.innerHTML = '';

    firebaseData.forEach(task => {
        if (!task.dataExtracted) {
            console.error('dataExtracted property missing in task:', task);
            return;
        }

        Object.keys(task.dataExtracted).forEach(key => {
            const taskData = task.dataExtracted[key];

            if (taskData.taskStatus === status) {
                const formattedContacts = formatContacts(taskData.taskContacts);
                const ticketHTML = ticketTemplate(taskData, formattedContacts);

                columnElement.innerHTML += ticketHTML;
            }
        });
    });
}


// Angenommen, die Funktion loadUrl() lädt die Daten und füllt firebaseTasks.

function generateTaskTitlesHTML() {
    // Container im HTML, wo die Titel angezeigt werden sollen
    const container = document.getElementById('test');

    // Iteriere durch das firebaseData Array und generiere HTML für jeden Task-Titel
    firebaseData.forEach(task => {
        // Annahme: firebaseData hat die Struktur wie { id: 'key', dataExtracted: { key1: { title: 'Task Title 1' }, key2: { title: 'Task Title 2' }, ... } }

        // Iteriere durch alle Schlüssel in dataExtracted
        Object.keys(task.dataExtracted).forEach(key => {
            const taskTitleElement = document.createElement('div');
            taskTitleElement.textContent = task.dataExtracted[key].taskTitel;

            // Füge das erstellte <div> Element dem Container hinzu
            container.appendChild(taskTitleElement);
        });
    });
}

// Beispiel: Aufruf der Funktion nach dem Laden der Daten
loadUrl().then(() => {
    generateTaskTitlesHTML();
});








function loadTickets() {
    renderTickets('toDo', 'toDo');
    renderTickets('inProgress', 'inProgress');
    renderTickets('awaitFeedback', 'awaitFeedback');
    renderTickets('done', 'done');
}

// DRAG AND DROP
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.add('dragging');
    for (let i = 0; i < 4; i++) {
        document.getElementById(`dragPosition${i}`).classList.add('dragPosition');
        document.getElementById(`dragPosition${i}`).classList.remove('dragAreaHighlight');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(taskStatus) {
    tickets[currentDraggedElement]['taskStatus'] = taskStatus;
    loadTickets();
}

function endDragging(id) {
    currentDraggedElement = id;
    document.getElementById(id).classList.remove('dragging');
    for (let i = 0; i < 4; i++) {

        document.getElementById(`dragPosition${i}`).classList.remove('dragPosition');
    }
}

function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}