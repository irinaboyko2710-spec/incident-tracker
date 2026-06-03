import incidentRepository from '../repositories/incidents.repository';
class IncidentService {
    async getAllIncidents() {
        return await incidentRepository.findAll();
    }
    async createIncident(data: any) {
        return await incidentRepository.create(data);
    }
    async getIncidentById(id: number, userId: number) {
        return await incidentRepository.findById(id, userId);
    }
    async updateIncident(id: number, userId: number, data: any) {
        const success = await incidentRepository.update(id, userId, data);
        if (!success) {
            throw { status: 403, message: 'Доступ заборонено: Ви не є власником цієї заявки' };
        }
        return { message: "Дані оновлено успішно", id };
    }

    async deleteIncident(id: number, userId: number) {
        const success = await incidentRepository.delete(id, userId);
        if (!success) {
            throw { status: 403, message: 'Доступ заборонено: Ви не є власником цієї заявки' };
        }
        return { message: "Інцидент успішно видалено", id };
    }
}
export default new IncidentService();