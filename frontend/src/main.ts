import { apiClient } from './apiClient.js';
import { ui } from './ui.js';
async function loadData() {
    try {
        const items = await apiClient.getAll();
        ui.renderTable(items, "itemsTableBody");
    } catch (err) {
        console.error("Помилка завантаження:", err);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#incidentForm") as any;
    loadData();
    form?.addEventListener("submit", async (e: any) => {
        e.preventDefault();
    const reporterValue = (document.querySelector("#reporterInput") as any).value.trim();
const dto: any = { 
    user_id: 1,
    user_name: reporterValue,
    reporter: reporterValue,
    date: (document.querySelector("#dateInput") as any).value,
    tag: (document.querySelector("#tagSelect") as any).value,
    severity: (document.querySelector("#severitySelect") as any).value,
    comments: (document.querySelector("#commentsInput") as any).value
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
        } catch (err: any) {
    alert("Не вдалося створити заявку: Помилка мережі або CORS");
}
    });
});
(window as any).deleteIncident = async (id: number) => {
    if (!confirm("Ви впевнені?")) return;
    try {
        await apiClient.remove(id);
        await loadData();
    } catch (err: any) {
        alert("Помилка видалення");
    }
};