import { apiClient } from './apiClient.js';
import { ui } from './ui.js';
async function loadData() {
    try {
        const items = await apiClient.getAll();
        ui.renderTable(items, "itemsTableBody");
    }
    catch (err) {
        console.error("Помилка завантаження:", err);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#incidentForm");
    loadData();
    form?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const reporterValue = document.querySelector("#reporterInput").value.trim();
        const dto = {
            user_id: 1,
            user_name: reporterValue,
            reporter: reporterValue,
            date: document.querySelector("#dateInput").value,
            tag: document.querySelector("#tagSelect").value,
            severity: document.querySelector("#severitySelect").value,
            comments: document.querySelector("#commentsInput").value
        };
        if (!reporterValue || !dto.date) {
            alert("Будь ласка, заповніть заявника та дату!");
            return;
        }
        if (!dto.user_name || !dto.date) {
            alert("Будь ласка, заповніть заявника та дату!");
            return;
        }
        try {
            await apiClient.create(dto);
            form.reset();
            await loadData();
            alert("Інцидент успішно створено!");
        }
        catch (err) {
            alert("Помилка: " + (err.detail || "немає зв'язку з сервером"));
        }
    });
});
window.deleteIncident = async (id) => {
    if (!confirm("Ви впевнені?"))
        return;
    try {
        await apiClient.remove(id);
        await loadData();
    }
    catch (err) {
        alert("Помилка видалення");
    }
};
