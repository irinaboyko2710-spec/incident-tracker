const repository = require('../repositories/incidents.repository');
class IncidentsService {
    getAll(filters) {
        let items = repository.findAll();
        if (filters && filters.severity) {
            items = items.filter(i => i.severity.toLowerCase() === filters.severity.toLowerCase());
        }
        return items;
    }
    getById(id) { return repository.findById(id); }
    create(data) { return repository.create(data); }
    update(id, data) { return repository.update(id, data); }
    delete(id) { return repository.delete(id); }
}
module.exports = new IncidentsService();