let tickets = [
    // 0
    {
        "id": 0,
        "taskType": 'User Story',
        "taskTitel": 'Kochwelt Page & Recipe Recommender',
        "taskDescription": 'Build start page with recipe recommendation Build start page with recipe recommendation',
        "taskBar": 50,
        "taskSubtaskAmount": 1,
        "taskContacts": ["Emmanuel Mauer", "Marcel Bauer", "Anton Mayer"],
        "taskPrioImage": './img/board/prio_high.png',
        "taskPrioAlt": 'High',
        "taskStatus": 'To do',
    },
    //1
    {
        "id": 1,
        "taskType": 'Technical Task',
        "taskTitel": 'HTML Base Template Creation',
        "taskDescription": '',
        "taskBar": 100,
        "taskSubtaskAmount": 2,
        "taskContacts": ["Anja Schulz", "David Eisenberg", "Eva Fischer"],
        "taskPrioImage": './img/board/prio_medium.png',
        "taskPrioAlt": 'Medium',
        "taskStatus": 'In progress'
    }
];

function formatContacts(contacts) {
    return contacts.map(contact => {
        let [firstName, lastName] = contact.split(' ');
        return `<div class="taskContact">${firstName[0]}${lastName[0]}</div>`;
    }).join('');
}

function renderTickets() {
    let userTicketColumn1 = document.getElementById('column1');
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const formattedContacts = formatContacts(ticket.taskContacts);

        userTicketColumn1.innerHTML += `
            <div id="${ticket.id}" draggable="true" ondragstart="startDragging()" onclick="openUserStory()" class="taskColumn">
                <div class="taskColumnContainer">
                    <div class="taskType">${ticket.taskType}</div>
                    <div class="taskTitel">${ticket.taskTitel}</div>
                    <div class="taskDescription">${ticket.taskDescription}</div>

                    <div class="taskSubtaskBarContainer">
                        <div class="taskSubtaskBar">
                            <div style="width:${ticket.taskBar}%" class="taskSubtaskBarFilledBar"></div>
                        </div>
                        <span>${ticket.taskSubtaskAmount}/2 Subtask</span>
                    </div>
                    <div class="taskContactsPrioContainer">
                        <div class="taskContactsContainer">
                            ${formattedContacts}
                        </div>
                        <div><img src="${ticket.taskPrioImage}" alt="${ticket.taskPrioAlt}"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

