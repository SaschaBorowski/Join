function dropDownListSampleAt() {
  let list = '';
  sortContactsAt();
  firebaseData.forEach(task => {
    Object.keys(task.dataExtracted).forEach(key => {
      const taskData = task.dataExtracted[key];
      if (taskData.color) {
        list += `
          <div onclick='addAssignedPersonAt(${JSON.stringify(taskData)})' class="flex-row persons-assignemend ${checkboxStates[taskData.email] ? 'persons-assignemend-checkt' : ''}" id="persons-assignemend${taskData.email}">
            <div class="flex-row name-container">
              <span id="persons${taskData.email}" class="assigned-emblem flex-row small-font" style="background-color: ${taskData.color}">${renderEmblemAt(taskData.name)}</span>
              <h4 id="assigned-name${taskData.email}" class="medium-font ${checkboxStates[taskData.email] ? 'assigned-color' : ''}">${taskData.name}</h4>
            </div>
            <div class="assigned-img-box">
              <img id="checkbox${taskData.email}" src="${checkboxStates[taskData.email] ? './img/checkbox_checkt.png' : './img/checkbox_uncheckt.png'}">
            </div>
          </div>
        `;
      } 
    });
  });
  return list;
}


function assignedResultsAt(taskData) {
  return `
    <span id="emblem${taskData.email}" class="assigned-emblem flex-row small-font" style="background-color: ${taskData.color}">${taskData.emblem}</span>
  `;
}


function subtaskSampleAt() {
  let list = '<ul class="add-task-list">';
  for (let i = 0; i < subtasksAt.length; i++) {
    const subtask = subtasksAt[i];
    list += `<li class="listItem flex-row" id="subtaskNr${i}">
        <span class="subtask-text">${subtask}</span>
        <div class="close-approve-container" id="editContainerAt${i}">
          <div class="small-icon-div" onclick="editSubtaskAt(this)">
            <img class="smaller-icon" src="/img/edit-dark.png">
          </div>
          <span class="small-input-vertical-vector"></span>
          <div class="small-icon-div" onclick="deleteSubtaskAt(this)">
            <img class="smaller-icon" src="/img/delete.png">
          </div>
        </div>
        <div class="close-approve-container hide" id="addRemoveContainerEditAt${i}">
          <div class="small-icon-div" onclick="approveEditAt(this)"><img class="smaller-icon" src="/img/check_dark_icon.svg"></div>
          <span class="small-input-vertical-vector"></span>
          <div class="small-icon-div" onclick="cancelEditAt(this)"><img class="small-icon" src="/img/Close.png"></div>
        </div>
      </li>`;
  }
  list += "</ul>";
  return list;
}

function personsFoundPostAt() {
  return foundPersonsByInput.map(person => `
    <div id="persons-assignemend${person.email}" class="flex-row persons-assignemend ${checkboxStates[person.email] ? 'persons-assignemend-checkt' : ''}">
      <div class="flex-row name-container">
        <span id="persons${person.email}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblemAt(person.name)}</span>
        <h4 id="assigned-name${person.email}" class="medium-font ${checkboxStates[person.email] ? 'assigned-color' : ''}">${person.name}</h4>
      </div>
      <div class="assigned-img-box">
        <img id="checkbox${person.email}" src="${checkboxStates[person.email] ? './img/checkbox_checkt.png' : './img/checkbox_uncheckt.png'}">
      </div>
    </div>
  `).join('');
}