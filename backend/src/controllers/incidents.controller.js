const service = require('../services/incidents.service');
class IncidentsController {
    getAll(req, res) {
        const items = service.getAll(req.query || {});
        res.json(items);
    }
    getOne(req, res) {
        const id = parseInt(req.params.id);
        const item = service.getById(id);
        if (!item) return res.status(404).json({ error: "Інцидент не знайдено" });
        res.json(item);
    }
    create(req, res) {
        const newItem = service.create(req.body);
        res.status(201).json(newItem);
    }
    update(req, res) {
        res.json({ message: `Інцидент ${req.params.id} оновлено` });
    }
    delete(req, res) {
        const success = service.delete(parseInt(req.params.id));
        if (!success) return res.status(404).json({ error: "Не вдалося видалити" });
        res.json({ message: "Видалено успішно" });
    }
}
module.exports = new IncidentsController();