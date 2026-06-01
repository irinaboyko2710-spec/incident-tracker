const STORAGE_KEY = "lab1_items";
let items = loadFromStorage();
let editingId = null;
const form = document.getElementById("incidentForm");
const tbody = document.getElementById("itemsTableBody");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const filterSeverity = document.getElementById("filterSeverity");
const sortDate = document.getElementById("sortDate");
renderTable();
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const dto = readForm();
    const isValid = validate(dto);
    if (!isValid) return;
    if (editingId !== null) {
       updateItem(editingId, dto);
       editingId = null;
       formTitle.textContent = "Додати інцидент";
       submitBtn.textContent = "Додати";
    } else {
        addItem(dto);
   }
    saveToStorage(items);
    renderTable();
    resetForm();
});
resetBtn.addEventListener("click", () => {
    editingId = null;
    formTitle.textContent = "Додати інцидент";
    submitBtn.textContent = "Додати";
    resetForm();
});
filterSeverity.addEventListener("change", () => {
    renderTable();
});
sortDate.addEventListener("change", () => {
    renderTable();
});
tbody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.dataset.id);
        deleteItemById(id);
        saveToStorage(items);
        renderTable();
    } else if (target.classList.contains("edit-btn")) {
        const id = Number(target.dataset.id);
        startEdit(id);
    }
});
function readForm() {
     return {
        reporter: document.getElementById("reporterInput").value.trim(),
        date: document.getElementById("dateInput").value,
        tag: document.getElementById("tagSelect").value,
        severity: document.getElementById("severitySelect").value,
        comments: document.getElementById("commentsInput").value.trim()
    };
}
function validate(dto) {
    clearErrors();
    let isValid = true;
    if (!dto.reporter || dto.reporter.length < 3) {
    showError("reporterInput", "reporterError", "Повідомив має містити щонайменше 3 символи.");
        isValid = false;
     }
      if (!dto.date) {
         showError("dateInput", "dateError", "Будь ласка, оберіть дату.");
          isValid = false;
        }
         if (!dto.tag) {
            showError("tagSelect", "tagError", "Оберіть тег зі списку.");
             isValid = false;
             }
              if (!dto.severity) {
                showError("severitySelect", "severityError", "Оберіть рівень загрози.");
                isValid = false;
            }
            return isValid;
}
function computeNextId() {
    if (items.length === 0) return 1;
    const maxId = Math.max(...items.map(x => x.id));
     return maxId + 1;
}
function addItem(dto) {
    const newItem = {
        id: computeNextId(),
    ...dto
    };
    items.push(newItem);
}
function updateItem(id, dto) {
     const index = items.findIndex(item => item.id === id);
     if (index !== -1) {
        items[index] = { id, ...dto };
 }
}
function deleteItemById(id) {
     items = items.filter(item => item.id !== id);
}
function startEdit(id) {
    const item = items.find(x => x.id === id);
    if (!item) return;
    editingId = id;
    formTitle.textContent = "Редагувати інцидент";
    submitBtn.textContent = "Зберегти";
    document.getElementById("reporterInput").value = item.reporter;
    document.getElementById("dateInput").value = item.date;
    document.getElementById("tagSelect").value = item.tag;
    document.getElementById("severitySelect").value = item.severity;
    document.getElementById("commentsInput").value = item.comments;
    clearErrors();
    window.scrollTo(0, 0);
}
function saveToStorage(arr) {
    const json = JSON.stringify(arr);
    localStorage.setItem(STORAGE_KEY, json);
}
function loadFromStorage() {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    try {
        const data = JSON.parse(json);
        return Array.isArray(data) ? data : [];
     } catch {
     return [];
 }
}
function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}
function clearError(inputId, errorId) {
    document.getElementById(inputId).classList.remove("invalid");
    document.getElementById(errorId).textContent = "";
}
function clearErrors() {
    clearError("reporterInput", "reporterError");
    clearError("dateInput", "dateError");
    clearError("tagSelect", "tagError");
    clearError("severitySelect", "severityError");
    clearError("commentsInput", "commentsError");
}
function resetForm() {
    form.reset();
    clearErrors();
}
function renderTable() {
    let rawItems = [...items];
    const severityFilter = filterSeverity.value;
    if (severityFilter !== "All") {
    rawItems = rawItems.filter(item => item.severity === severityFilter);
    }
    const dateSort = sortDate.value;
    if (dateSort === "asc") {
      rawItems.sort((a, b) => a.date.localeCompare(b.date));
     } else if (dateSort === "desc") {
      rawItems.sort((a, b) => b.date.localeCompare(a.date));
     }
     const rowsHtml = rawItems.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.reporter}</td>
            <td>${item.date}</td>
            <td>${item.tag}</td>
            <td>${item.severity}</td>
            <td>${item.comments}</td>
            <td>
               <button type="button" class="edit-btn" data-id="${item.id}">Редагувати</button>
              <button type="button" class="delete-btn" data-id="${item.id}">Видалити</button>
           </td>
      </tr>
    `).join("");
    tbody.innerHTML = rowsHtml;
}                                                                                                                                                                              
