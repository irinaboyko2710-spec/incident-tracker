const userService = require('../services/users.service');
class UserController {
    getAll = async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    create = async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
    getOne = async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: "Не знайдено" });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new UserController();