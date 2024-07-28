let selectedOptions = {};


function openUserStory(id) {
    let overlay = document.getElementById('overlay');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    boardBodyContainer.style.overflow = "hidden";
    overlay.classList.add("overlay");

    const container = document.getElementById('userStoryWindow');
    container.innerHTML = ''; // Clear previous content

    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        Object.keys(tasksData).forEach(key => {
            const taskData = tasksData[key];
            if (id === taskData.id) {
                const formattedSubtasks = formatSubtasks(taskData.taskSubtasks, taskData.taskSubtasksSelected, taskData.id);

                console.log("open Ticket Key:::", key);
                const formattedContactsFullName = formatContactsFullName(taskData.taskContacts);
                const formattedContacts = formatContacts(taskData.taskContacts);
                const taskHtml = userStoryHtmlTemplate(taskData, formattedContacts, formattedContactsFullName, formattedSubtasks);
                const taskContainer = document.createElement('div');
                taskContainer.innerHTML = taskHtml;
                container.appendChild(taskContainer.firstElementChild);

                // Initialize selected options for the task
                selectedOptions[taskData.id] = taskData.taskSubtasksSelected || [];
            }
        });
    } else {
        console.error("firebaseTasks or firebaseTasks[0].dataExtracted is undefined or null.");
    }
    initializeSubTaskCheckboxes();
    scrollToTop();
}


function formatSubtasks(taskSubtasks, taskSubtasksSelected, taskId) {
    if (!Array.isArray(taskSubtasks)) {
        return '';
    }
    return taskSubtasks.map(subtask => {
        if (!subtask) return ''; // Leere Subtasks überspringen
        const subtaskId = `${taskId}_${subtask.replace(/\s+/g, '_')}`;
        const isChecked = taskSubtasksSelected && taskSubtasksSelected.includes(subtaskId);
        const checkboxSrc = isChecked ? './img/checkbox_checkt_dark.png' : './img/checkbox_uncheckt.png';
        return `
        <div class="userStorySubtasksContainer">
            <img id="${subtaskId}" onclick="toggleCheckbox('${subtaskId}');" class="subtask-checkbox" data-checked="${isChecked}" src="${checkboxSrc}" alt="Checkbox">
            <div class="userStorySubtaskTitle">${subtask}</div>
        </div>`;
    }).join('');
}

function initializeSubTaskCheckboxes() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('subtask-checkbox')) {
            console.log(event.target.id);
        }
    });
}

async function toggleCheckbox(subtaskId) {
    const checkbox = document.getElementById(subtaskId);
    if (checkbox) {
        const isChecked = checkbox.dataset.checked === 'true';
        checkbox.dataset.checked = !isChecked;
        const src = isChecked ? './img/checkbox_uncheckt.png' : './img/checkbox_checkt_dark.png';
        checkbox.setAttribute('src', src);
        const taskId = getTaskIdFromSubtaskId(subtaskId);
        const taskKey = getTaskKeyFromSubtaskId(subtaskId);
        if (taskId !== null && taskKey !== null) {
            if (!isChecked) {
                selectedOptions[taskId] = selectedOptions[taskId] || [];
                selectedOptions[taskId].push(subtaskId);
            } else {
                selectedOptions[taskId] = selectedOptions[taskId] || [];
                selectedOptions[taskId] = selectedOptions[taskId].filter(id => id !== subtaskId);
            }
            // Finde den entsprechenden Task in firebaseTasks und aktualisiere ihn
            try {
                await patchSubtaskSelected(taskKey, { taskSubtasksSelected: selectedOptions[taskId] });
                console.log("Daten für Task", taskId, "aktualisiert");
            } catch (error) {
                console.error("Fehler beim Aktualisieren der Daten:", error);
            }
        } else {
            console.error("TaskId oder TaskKey für SubtaskId", subtaskId, "nicht gefunden.");
        }
    }
}

function getTaskIdFromSubtaskId(subtaskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            const taskData = tasksData[key];
            const taskSubtaskIdPrefix = `${taskData.id}_`;
            if (taskData.taskSubtasks && taskData.taskSubtasks.some(subtask => `${taskSubtaskIdPrefix}${subtask.replace(/\s+/g, '_')}` === subtaskId)) {
                return taskData.id;
            }
        }
    }
    return null;
}

function getTaskKeyFromSubtaskId(subtaskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            const taskData = tasksData[key];
            const taskSubtaskIdPrefix = `${taskData.id}_`;
            if (taskData.taskSubtasks && taskData.taskSubtasks.some(subtask => `${taskSubtaskIdPrefix}${subtask.replace(/\s+/g, '_')}` === subtaskId)) {
                return key;
            }
        }
    }
    return null;
}


async function patchSubtaskSelected(taskKey, updatedData) {
    const path = `tasks/${taskKey}`;
    try {
        let response = await fetch(`${BASE_URL}/${path}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Daten:", error);
    }
}

function findTaskById(taskId) {
    if (firebaseTasks && firebaseTasks[0] && firebaseTasks[0].dataExtracted) {
        const tasksData = firebaseTasks[0].dataExtracted;
        for (const key in tasksData) {
            if (tasksData[key].id === taskId) {
                return tasksData[key];
            }
        }
    }
    return null;
}


// Format contacts for a specific task
function formatContactsFullName(taskContacts) {
    let formattedContactsFullName = '';
    if (Array.isArray(taskContacts)) {
        taskContacts.forEach(contact => {
            if (contact.name) {
                formattedContactsFullName += `<div class="assignedContactsFullName">${contact.name}</div>`;
            }
        });
    }
    return formattedContactsFullName;
}


function closeUserStory() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');

    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

function openUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    if (firebaseData.length > 0) {
        userStoryContainer.innerHTML = userStoryEditHtmlTemplate(firebaseData);
    }
    renderDropdownList();
    subTasksHoverEffect();
}

function closeUserStoryEdit() {
    let userStoryContainer = document.getElementById('userStoryWindow');
    let boardBodyContainer = document.querySelector('.boardBodyContainer');
    let overlay = document.getElementById('overlay');
    userStoryContainer.style.animation = 'fly-out 0.1s forwards';
    overlay.style.animation = 'fade-out 0.2s forwards';
    setTimeout(() => {
        userStoryContainer.innerHTML = ``;
        userStoryContainer.style.animation = ``;
        boardBodyContainer.style.overflow = "";
        overlay.style.animation = '';
        overlay.classList.remove("overlay");
    }, 200);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}