export const ui = {
    renderTable(items: any[], containerId: string) {
        const tbody = document.getElementById(containerId);
        if (!tbody) return;
        tbody.innerHTML = ''; 
        if (items.length === 0) {
            const row = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 7;
            td.textContent = 'Інциденти відсутні';
            row.appendChild(td);
            tbody.appendChild(row);
            return;
        }
        items.forEach(item => {
            const row = document.createElement('tr');
            const addCell = (text: any) => {
                const td = document.createElement('td');
                td.textContent = text !== null && text !== undefined ? String(text) : '—';
                row.appendChild(td);
            };
            addCell(item.id);
            addCell(item.date ? item.date.replace('T', ' ') : '—');
            addCell(item.tag);
            const severityCell = document.createElement('td');
            const badge = document.createElement('span');
            badge.className = `badge ${item.severity || 'info'}`;
            badge.textContent = item.severity || '—';
            severityCell.appendChild(badge);
            row.appendChild(severityCell);
            addCell(item.user_name || item.reporter);
            addCell(item.comments); 
            const actionsCell = document.createElement('td');
            const btn = document.createElement('button');
            btn.className = 'btn-danger';
            btn.textContent = 'Видалити';
            btn.onclick = () => (window as any).deleteIncident(item.id);
            actionsCell.appendChild(btn);
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    }
};