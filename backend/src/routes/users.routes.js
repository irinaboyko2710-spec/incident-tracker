const router = require('express').Router();
const service = require('../services/users.service');
router.get('/', (req, res) => {
    res.json(service.getAll());
});
router.post('/', (req, res) => {
    res.status(201).json(service.create(req.body));
});
module.exports = router;