let contacts = [
  { name: 'Anton Meyer', email: 'anton@gmail.com', phone: '123456789', color: '#ff5733', emblem: 'AM' },
  { name: 'Bernd Bauer', email: 'bernd@gmail.com', phone: '987654321', color: '#33ff57', emblem: 'BB' },
  { name: 'Clara Schmidt', email: 'clara@gmail.com', phone: '456789123', color: '#3357ff', emblem: 'CS' },
  { name: 'David Müller', email: 'david@gmail.com', phone: '789123456', color: '#ff33a1', emblem: 'DM' },
  { name: 'Eva Braun', email: 'eva@gmail.com', phone: '321456987', color: '#a133ff', emblem: 'EB' },
  { name: 'Fritz Weber', email: 'fritz@gmail.com', phone: '654789321', color: '#33ffa1', emblem: 'FW' },
  { name: 'Gisela Hofmann', email: 'gisela@gmail.com', phone: '987321654', color: '#ff7f33', emblem: 'GH' },
  { name: 'Hanna Schuster', email: 'hanna@gmail.com', phone: '321987654', color: '#33b5ff', emblem: 'HS' },
  { name: 'Ingrid König', email: 'ingrid@gmail.com', phone: '654123789', color: '#ff3357', emblem: 'IK' },
  { name: 'Jakob Fischer', email: 'jakob@gmail.com', phone: '123789456', color: '#57ff33', emblem: 'JF' },
  { name: 'Klaus Schneider', email: 'klaus@gmail.com', phone: '789654123', color: '#33ffb5', emblem: 'KS' },
  { name: 'Lena Wagner', email: 'lena@gmail.com', phone: '456123789', color: '#ff5733', emblem: 'LW' },
  { name: 'Martin Becker', email: 'martin@gmail.com', phone: '321789456', color: '#a1ff33', emblem: 'MB' },
  { name: 'Nina Krause', email: 'nina@gmail.com', phone: '654987321', color: '#ff33d7', emblem: 'NK' },
  { name: 'Olaf Zimmermann', email: 'olaf@gmail.com', phone: '987456123', color: '#337fff', emblem: 'OZ' },
  { name: 'Petra Neumann', email: 'petra@gmail.com', phone: '123654789', color: '#ff5733', emblem: 'PN' },
  { name: 'Quirin Lang', email: 'quirin@gmail.com', phone: '456987321', color: '#33ff57', emblem: 'QL' },
  { name: 'Rita Schulz', email: 'rita@gmail.com', phone: '789321654', color: '#ff33b5', emblem: 'RS' },
  { name: 'Stefan Wolf', email: 'stefan@gmail.com', phone: '321456789', color: '#33a1ff', emblem: 'SW' },
  { name: 'Tina Maier', email: 'tina@gmail.com', phone: '654789123', color: '#ff5733', emblem: 'TM' },
  { name: 'Uwe Krüger', email: 'uwe@gmail.com', phone: '987123456', color: '#a1ff57', emblem: 'UK' },
  { name: 'Vera Frank', email: 'vera@gmail.com', phone: '123456987', color: '#ff7f57', emblem: 'VF' },
];

function subtaskSample() {
  let list = '<ul class="add-task-list">';
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    list += `<li class="listItem flex-row" id="subtaskNr${i}">
        <span class="subtask-text">${subtask}</span>
        <div class="close-approve-container" id="editContainer${i}">
          <div class="small-icon-div" onclick="editSubtask(this)">
            <img class="smaller-icon" src="/img/edit-dark.png">
          </div>
          <span class="small-input-vertical-vector"></span>
          <div class="small-icon-div" onclick="deleteSubtask(this)">
            <img class="smaller-icon" src="/img/delete.png">
          </div>
        </div>
        <div class="close-approve-container hide" id="addRemoveContainerEdit${i}">
          <div class="small-icon-div" onclick="approveEdit(this)"><img class="smaller-icon" src="/img/check_dark_icon.svg"></div>
          <span class="small-input-vertical-vector"></span>
          <div class="small-icon-div" onclick="cancelEdit(this)"><img class="small-icon" src="/img/Close.png"></div>
        </div>
      </li>`;
  }
  list += "</ul>";
  return list;
}

function dropDownListSample(){
  let list = '';
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    let person = contacts[i];
    list += `
    <div onclick="addAssignedPerson(${i})" class="flex-row persons-assignemend" id="persons-assignemend${i}">
      <div class="flex-row name-container">
        <span id="persons${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
        <h4 id="assigned-name${i}" class="medium-font">${person.name}</h4>
      </div>
      <div class="assigned-img-box">
        <img id="checkbox${i}" src="./img/checkbox_uncheckt.png">
      </div>
    </div>
    `
  }
  return list;
}

function assignedResults(){
  let list = '';
  for (let i = 0; i < assignedPersons.length; i++) {
    let person = assignedPersons[i];
    list += `
    <span class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
    `
  }
  return list;
}

function personsFoundPost(foundPersons){
  let list = '';
  sortContacts();
  for (let i = 0; i < foundPersons.length; i++) {
    let person = foundPersons[i];
    list += `
    <div onclick="addAssignedPerson(${i})" class="flex-row persons-assignemend" id="persons-assignemend${i}">
      <div class="flex-row name-container">
        <span id="persons${i}" class="assigned-emblem flex-row small-font" style="background-color: ${person.color}">${renderEmblem(person.name)}</span>
        <h4 id="assigned-name${i}" class="medium-font">${person.name}</h4>
      </div>
      <div class="assigned-img-box">
        <img id="checkbox${i}" src="./img/checkbox_uncheckt.png">
      </div>
    </div>
    `
  }
  return list;
}