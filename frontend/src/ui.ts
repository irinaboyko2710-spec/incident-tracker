import { IncidentDTO } from './dtos.js';
export const ui = {
    renderTable(items: IncidentDTO[], containerId: string) {
        const tbody = document.getElementById(containerId);
        if (!tbody) return;
        if (items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">Інциденти відсутні</td></tr>';
            return;
        }
        tbody.innerHTML = items.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.date ? item.date.replace('T', ' ') : '—'}</td>
                <td>${item.tag}</td>
                <td><span class="badge ${item.severity}">${item.severity}</span></td>
                <td>${(item as any).user_name || (item as any).reporter || '—'}</td>
                <td>${item.comments}</td>
                <td>
                    <button class="btn-danger" onclick="window.deleteIncident(${item.id})">Видалити</button>
                </td>
            </tr>
        `).join("");
    }
};