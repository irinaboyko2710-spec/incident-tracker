import { apiClient } from './apiClient.js';
let items = [];
let editingId = null;
const form = document.getElementById("incidentForm");
const tbody = document.getElementById("itemsTableBody");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const filterSeverity = document.getElementById("filterSeverity");
const sortDate = document.getElementById("sortDate");
async function loadData() {
    tbody.innerHTML = '<tr><td colspan="7">Завантаження...</td></tr>';
    try {
        items = await apiClient.getAll();
        renderTable();
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="7" style="color: red;">
            Помилка: ${error.detail || error.message}
        </td></tr>`;
    }
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const dto = readForm();
    if (!validate(dto)) return;
    submitBtn.disabled = true;
    submitBtn.textContent = "Зачекайте...";
    try {
        const bodyForServer = {
            date: dto.date,
            tag: dto.tag,
            severity: mapSeverity(dto.severity),
            comments: dto.comments,
            user_id: 1 
        };
        if (editingId) {
            await apiClient.update(editingId, bodyForServer);
            alert("Інцидент успішно оновлено!");
        } else {
            const newItem = await apiClient.create(bodyForServer);
            items.push({ ...newItem, reporter: dto.reporter });
            alert("Інцидент успішно додано до бази SQLite!");
        }
        editingId = null;
        form.reset();
        formTitle.textContent = "Додати інцидент";
        submitBtn.textContent = "Додати";
        await loadData(); 
    } catch (error) {
        alert(`Помилка: ${error.title || "Сервер"}\n${error.detail || "Дія не вдалася"}`);
    } finally {
        submitBtn.disabled = false;
    }
});
async function deleteItem(id) {
    if (!confirm("Ви впевнені, що хочете видалити цей запис?")) return;
    const btn = document.querySelector(`button.delete-btn[data-id="${id}"]`);
    if (btn) btn.disabled = true;
    try {
        await apiClient.remove(id);
        items = items.filter(item => item.id !== id);
        renderTable();
    } catch (error) {
        alert(`Не вдалося видалити: ${error.detail || "Помилка бази"}`);
        if (btn) btn.disabled = false;
    }
}
function startEdit(id) {
    const item = items.find(x => x.id === id);
    if (!item) return;
    editingId = id;
    formTitle.textContent = "Редагувати інцидент";
    submitBtn.textContent = "Зберегти зміни";
    document.getElementById("reporterInput").value = item.reporter || "Адміністратор";
    document.getElementById("dateInput").value = item.date;
    document.getElementById("tagSelect").value = item.tag;
    document.getElementById("severitySelect").value = item.severity;
    document.getElementById("commentsInput").value = item.comments || "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function renderTable() {
    let rawItems = [...items];
    const sev = filterSeverity.value;
    if (sev !== "All") {
        rawItems = rawItems.filter(i => i.severity === sev);
    }
    const dateS = sortDate.value;
    if (dateS === "asc") rawItems.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    else if (dateS === "desc") rawItems.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (rawItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Записів не знайдено.</td></tr>';
        return;
    }
    tbody.innerHTML = rawItems.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.date || '-'}</td>
            <td>${item.tag || '-'}</td>
            <td>${item.severity || '-'}</td>
            <td>${item.reporter || 'Адміністратор'}</td>
            <td>${item.comments || '-'}</td>
            <td>
                <button class="edit-btn" data-id="${item.id}">Ред.</button>
                <button class="delete-btn" data-id="${item.id}">Вид.</button>
            </td>
        </tr>
    `).join("");
}
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
    let ok = true;
    if (dto.reporter.length < 3) {
        showError("reporterInput", "reporterError", "Мінімум 3 символи");
        ok = false;
    }
    if (!dto.date) {
        showError("dateInput", "dateError", "Оберіть дату");
        ok = false;
    }
    return ok;
}
function mapSeverity(val) {
    if (val.includes("Низ") || val.includes("Low")) return "Low";
    if (val.includes("Сер") || val.includes("Medium")) return "Medium";
    if (val.includes("Вис") || val.includes("High")) return "High";
    return "Low";
}
tbody.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;
    if (e.target.classList.contains("delete-btn")) {
        deleteItem(id);
    } else if (e.target.classList.contains("edit-btn")) {
        startEdit(id);
    }
});
filterSeverity.addEventListener("change", renderTable);
sortDate.addEventListener("change", renderTable);
window.deleteItem = deleteItem;
window.startEdit = startEdit;
function showError(id, errId, msg) {
    document.getElementById(id).classList.add("invalid");
    document.getElementById(errId).textContent = msg;
}
function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(e => e.textContent = "");
    document.querySelectorAll('input, select').forEach(i => i.classList.remove("invalid"));
}
document.addEventListener("DOMContentLoaded", loadData);