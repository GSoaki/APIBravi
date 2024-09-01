const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://35.208.153.129:8080";

const apiBaseUrl = apiUrl + "/api/person";

function listPersons() {
  $.ajax({
    url: apiBaseUrl,
    method: "GET",
    success: function (persons) {
      $("#personList").empty();
      persons.forEach(function (person) {
        const personList = document.getElementById("personList");
        const li = document.createElement("li");
        li.className = "bg-white shadow-md rounded py-2 mb-2";
        li.innerHTML = `
            <div class="flex justify-between items-center px-4 py-2 block hover:bg-gray-100 transition-colors duration-200" >
                <a class="person-link px-4 py-2 block hover:bg-gray-100 transition-colors duration-200 person-text" href="../contact#/person/${person.id}">
                    <span class="text-gray-700">${person.name}</span>
                </a>
                <input type="text" class="person-input border rounded pl-2 py-1 hidden" value="${person.name}"/>
                <div class="flex items-center space-x-2">
                    <button class="edit-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded" onclick="editPerson(this)">Editar</button>
                    <button class="cancel-edit-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded  hidden" onclick="cancelEdit(this)">Cancelar</button>
                    <button class="save-button bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded  hidden" onclick="savePerson(this,'${person.id}')">Salvar</button>
                    <button class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onclick="deletePerson(this,'${person.id}')">Deletar</button>
                </div>
            </a>
        `;
        personList.appendChild(li);
      });
    },
  });
}

function addPerson() {
  const name = $("#personName").val();
  $.ajax({
    url: apiBaseUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ name }),
    success: function () {
      $("#personName").val("");
      listPersons();
    },
  });
}

function deletePerson(button, id) {
  const li = button.closest("li");
  li.remove();
  $.ajax({
    url: `${apiBaseUrl}/${id}`,
    method: "DELETE",
  });
}

function editPerson(button) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const personText = li.querySelector(".person-text");
  const personInput = li.querySelector(".person-input");
  const cancelEditButton = li.querySelector(".cancel-edit-button");

  cancelEditButton.classList.remove("hidden");
  personInput.classList.remove("hidden");
  personInput.focus();
  personText.classList.add("hidden");
  editButton.classList.add("hidden");
  deleteButton.classList.add("hidden");
  saveButton.classList.remove("hidden");
}

function cancelEdit(button) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const personText = li.querySelector(".person-text");
  const personInput = li.querySelector(".person-input");
  const cancelEditButton = li.querySelector(".cancel-edit-button");

  cancelEditButton.classList.add("hidden");
  personInput.classList.add("hidden");
  personText.classList.remove("hidden");
  editButton.classList.remove("hidden");
  deleteButton.classList.remove("hidden");
  saveButton.classList.add("hidden");
}

function savePerson(button, id) {
  const li = button.closest("li");
  const editButton = li.querySelector(".edit-button");
  const deleteButton = li.querySelector(".delete-button");
  const saveButton = li.querySelector(".save-button");
  const personText = li.querySelector(".person-text");
  const personInput = li.querySelector(".person-input");
  const cancelEditButton = li.querySelector(".cancel-edit-button");

  const name = personInput.value;

  personText.textContent = name;

  cancelEditButton.classList.add("hidden");
  personInput.classList.add("hidden");
  editButton.classList.remove("hidden");
  saveButton.classList.add("hidden");
  deleteButton.classList.remove("hidden");
  personText.classList.remove("hidden");

  $.ajax({
    url: `${apiBaseUrl}/${id}`,
    method: "Put",
    contentType: "application/json",
    data: JSON.stringify({ name, id }),
    success: function () {
      listPersons();
    },
  });
}

$(document).ready(function () {
  listPersons();
});
