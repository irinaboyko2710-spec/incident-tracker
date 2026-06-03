export const ui = {
    renderTable(items, containerId) {
        const tbody = document.getElementById(containerId);
        if (!tbody) return;
        tbody.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            const addCell = (text) => {
                const td = document.createElement('td');
                td.textContent = text || '—';
                row.appendChild(td);
            };
            addCell(item.id);
            addCell(item.date ? item.date.replace('T', ' ') : '—');
            addCell(item.tag);
            const severityCell = document.createElement('td');
            const span = document.createElement('span');
            span.className = 'badge ' + (item.severity || '');
            span.textContent = item.severity || '—';
            severityCell.appendChild(span);
            row.appendChild(severityCell);
            addCell(item.user_name || item.reporter);
            addCell(item.comments); 
            const actionsCell = document.createElement('td');
            const btn = document.createElement('button');
            btn.className = 'btn-danger';
            btn.textContent = 'Видалити';
            btn.onclick = () => window.deleteIncident(item.id);
            actionsCell.appendChild(btn);
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    }
};