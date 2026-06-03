import { Request, Response, NextFunction } from 'express';
import incidentService from '../services/incidents.service';

class IncidentController {
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const incidents = await incidentService.getAllIncidents();
            res.json(incidents);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newIncident = await incidentService.createIncident(req.body);
            res.status(201).json(newIncident);
        } catch (error) {
            next(error);
        }
    }

    getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.headers['x-demo-userid']);
        const id = Number(req.params.id);
        const item = await incidentService.getIncidentById(id, userId);
        res.json(item);
    } catch (error: any) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
}

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.headers['x-demo-userid']);
            const id = Number(req.params.id);
            const updated = await incidentService.updateIncident(id, userId, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.headers['x-demo-userid']);
            const id = Number(req.params.id);
            const result = await incidentService.deleteIncident(id, userId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
export default new IncidentController();