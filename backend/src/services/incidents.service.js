const incidentRepository = require('../repositories/incidents.repository');
class IncidentService {
    async getAllIncidents() {
        return await incidentRepository.findAll();
    }
    async createIncident(data) {
        return await incidentRepository.create(data);
    }
    async getIncidentById(id) {
        return await incidentRepository.findById(id);
    }
    async updateIncident(id, data) {
        const success = await incidentRepository.update(id, data);
        if (!success) {
            throw new Error('Інцидент не знайдено для оновлення');
        }
        return { message: "Дані оновлено успішно", id };
    }
    async deleteIncident(id) {
        const success = await incidentRepository.delete(id);
        if (!success) {
            throw new Error('Не вдалося видалити: інцидент не знайдено');
        }
        return { message: "Інцидент успішно видалено", id };
    }
}
module.exports = new IncidentService();