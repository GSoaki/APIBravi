const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://35.208.153.129:8080";

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
          "bg-white shadow-md rounded px-4 py-2 mb-2 flex justify-between items-center flex-wrap";
        li.innerHTML = `
                <span class="text-gray-700 contact-text">${contact.type}: ${contact.value}</span>
                <input type="text" class="contact-type-input border rounded px-2 py-1 hidden" value="${contact.type}"/>
                <input type="text" class="contact-value-input border rounded px-2 py-1 hidden" value="${contact.value}"/>
                <div class="flex items-center space-x-2 mt-4">
                    <button onclick="editContact(this)" class="edit-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">Editar</button>
                    <button class="cancel-edit-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded  hidden" onclick="cancelEdit(this)">Cancelar</button>
                    <button onclick="saveContact(this,'${contact.id}')" class="save-button bg-green-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded hidden">Salvar</button>
                    <button onclick="deleteContact(this,'${contact.id}')" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Deletar</button>
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
  const li = button.closest("li");
  li.remove();
  $.ajax({
    url: `${contactApiBaseUrl}/${id}`,
    method: "DELETE",
  });
}

function editContact(button) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const cancelEditButton = li.querySelector(".cancel-edit-button");
  const contactText = li.querySelector(".contact-text");
  const contactTypeInput = li.querySelector(".contact-type-input");
  const contactValueInput = li.querySelector(".contact-value-input");

  cancelEditButton.classList.remove("hidden");
  contactTypeInput.classList.remove("hidden");
  contactTypeInput.focus();
  contactValueInput.classList.remove("hidden");
  contactText.classList.add("hidden");
  editButton.classList.add("hidden");
  deleteButton.classList.add("hidden");
  saveButton.classList.remove("hidden");
}

function cancelEdit(button) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const contactText = li.querySelector(".contact-text");
  const contactTypeInput = li.querySelector(".contact-type-input");
  const contactValueInput = li.querySelector(".contact-value-input");
  const cancelEditButton = li.querySelector(".cancel-edit-button");

  cancelEditButton.classList.add("hidden");
  contactValueInput.classList.add("hidden");
  contactTypeInput.classList.add("hidden");
  contactText.classList.remove("hidden");
  editButton.classList.remove("hidden");
  deleteButton.classList.remove("hidden");
  saveButton.classList.add("hidden");
}

function saveContact(button, id) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const cancelEditButton = li.querySelector(".cancel-edit-button");
  const contactTypeInput = li.querySelector(".contact-type-input");
  const contactValueInput = li.querySelector(".contact-value-input");
  const contactText = li.querySelector(".contact-text");

  const newType = contactTypeInput.value;
  const newValue = contactValueInput.value;

  contactText.textContent = `${newType}: ${newValue}`;

  cancelEditButton.classList.add("hidden");
  editButton.classList.remove("hidden");
  saveButton.classList.add("hidden");
  deleteButton.classList.remove("hidden");
  contactTypeInput.classList.add("hidden");
  contactValueInput.classList.add("hidden");
  contactText.classList.remove("hidden");

  $.ajax({
    url: `${contactApiBaseUrl}/${id}`,
    method: "Put",
    contentType: "application/json",
    data: JSON.stringify({ id, type: newType, value: newValue, personId }),
    success: function () {
      listContacts();
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
