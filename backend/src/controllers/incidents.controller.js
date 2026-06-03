const IncidentRepository = require('../repositories/incidents.repository');
class IncidentController {
    async getAll(req, res, next) {
        try {
            const incidents = await IncidentRepository.findAll();
            res.json(incidents);
        } catch (err) { next(err); }
    }
    async getOne(req, res, next) {
        try {
            const incident = await IncidentRepository.findById(req.params.id);
            if (!incident) {
                return res.status(404).json({ status: 404, title: "Not Found", detail: `Incident with ID ${req.params.id} does not exist.` });
            }
            res.json(incident);
        } catch (err) { next(err); }
    }
    async create(req, res, next) {
        try {
            const newIncident = await IncidentRepository.create(req.body);
            res.status(201).json(newIncident);
        } catch (err) { next(err); }
    }
    async update(req, res, next) {
        try {
            const updated = await IncidentRepository.update(req.params.id, req.body);
            if (!updated) {
                return res.status(404).json({ status: 404, title: "Not Found", detail: `Cannot update. Incident with ID ${req.params.id} not found.` });
            }
            res.json({ message: "Incident updated successfully" });
        } catch (err) { next(err); }
    }
    async delete(req, res, next) {
        try {
            const deleted = await IncidentRepository.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ status: 404, title: "Not Found", detail: `Cannot delete. Incident with ID ${req.params.id} not found.` });
            }
            res.status(204).end(); 
        } catch (err) { next(err); }
    }
}

module.exports = new IncidentController();