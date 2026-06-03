import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';
class UserController {
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userService.getUserById(Number(req.params.id));
            if (!user) return res.status(404).json({ message: "Не знайдено" });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();