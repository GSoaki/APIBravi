const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'http://35.208.153.129:8080';

const contactApiBaseUrl = apiUrl + "/api/contact";
const personApiBaseUrl = apiUrl + "/api/person";
var personId = "";

function listContacts() {
  $.ajax({
    url: contactApiBaseUrl + "?personId=" + personId,
    method: "GET",
    success: function (contacts) {
      $("#contactList").empty();
      contacts.forEach(function (contact) {
        const contactList = document.getElementById("contactList");
        const li = document.createElement("li");
        li.className =
          "bg-white shadow-md rounded px-4 py-2 mb-2 flex justify-between items-center";
        li.innerHTML = `
                <span class="text-gray-700 contact-text">${contact.type}: ${contact.value}</span>
            
                <div class="flex items-center space-x-2">
                    <button onclick="editContact(this)" class="edit-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">Editar</button>
                    <button onclick="saveContact(this,"${contact.id}")" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded hidden">Salvar</button>
                    <button onclick="deleteContact(this,"${contact.id}")" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Deletar</button>
                </div>
            `;
        contactList.appendChild(li);
      });
    },
  });
}

function getPerson() {
  $.ajax({
    url: personApiBaseUrl + "/" + personId,
    method: "GET",
    success: function (person) {
      $("#contact-person").text("Contatos de: " + person.name);
    },
  });
}

function addContact() {
  const type = $("#contactType").val();
  const value = $("#contactValue").val();
  $.ajax({
    url: contactApiBaseUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ type, value, personId }),
    success: function () {
      $("#contactType").val("");
      $("#contactValue").val("");
      listContacts();
    },
  });
}

function deleteContact(button, id) {
  const li = button.closest('li');
  li.remove();
  $.ajax({
    url: `${contactApiBaseUrl}/${id}`,
    method: "DELETE"
  });
}

function editContact(button){
    const li = button.closest('li');
    const editButton = li.querySelector('.edit-button');
    const deleteButton = li.querySelector('.delete-button');
    const saveButton = li.querySelector('.save-button');
    const contactText = li.querySelector('.contact-text');

    editButton.classList.add('hidden');
    deleteButton.classList.add('hidden');
    saveButton.classList.remove('hidden');

    const [type, value] = contactText.textContent.split(': ');
    contactText.innerHTML = `
        <input type="text" class="border rounded px-2 py-1" value="${type}">
        <input type="text" class="border rounded px-2 py-1" value="${value}">
    `;
}

function saveContact(button, id) {
    const li = button.closest('li');
    const editButton = li.querySelector('.edit-button');
    const deleteButton = li.querySelector('.delete-button');
    const saveButton = li.querySelector('.save-button');
    const inputs = li.querySelectorAll('input');
    const contactText = li.querySelector('.contact-text');
    
    const newType = inputs[0].value;
    const newValue = inputs[1].value;

    contactText.textContent = `${newType}: ${newValue}`;

    editButton.classList.remove('hidden');
    saveButton.classList.add('hidden');
    deleteButton.classList.remove('hidden');
     $.ajax({
        url: `${contactApiBaseUrl}/${id}`,
        method: "Put",
        contentType: "application/json",
        data: JSON.stringify({ newType, newValue, personId }),
        success: function () {
          listPersons();
        },
    });
}

$(document).ready(function () {
  const hash = window.location.hash;
  if (hash.startsWith("#/person/")) {
    personId = hash.split("/")[2];
  }
  getPerson();
  listContacts();
});
