const service = require('../services/users.service');
const { UserResponseDto } = require('../dtos/users.dto');
class UsersController {
    getAll(req, res) {
        const users = service.getAll().map(user => new UserResponseDto(user));
        res.json(users);
    }
    getOne(req, res) {
        const user = service.getById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ 
                error: { code: "NOT_FOUND", message: "Користувача не знайдено" } 
            });
        }
        res.json(new UserResponseDto(user));
    }
}
module.exports = new UsersController();