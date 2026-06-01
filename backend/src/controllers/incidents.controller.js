const incidentService = require('../services/incidents.service');
class IncidentController {
    getAll = async (req, res, next) => {
        try {
            const incidents = await incidentService.getAllIncidents();
            res.json(incidents);
        } catch (error) {
            next(error);
        }
    }
    create = async (req, res, next) => {
        try {
            const newIncident = await incidentService.createIncident(req.body);
            res.status(201).json(newIncident);
        } catch (error) {
            next(error);
        }
    }
    getOne = async (req, res, next) => {
        try {
            const item = await incidentService.getIncidentById(req.params.id);
            if (!item) return res.status(404).json({ message: "Не знайдено" });
            res.json(item);
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        try {
            const updated = await incidentService.updateIncident(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }
    delete = async (req, res, next) => {
        try {
            const result = await incidentService.deleteIncident(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new IncidentController();