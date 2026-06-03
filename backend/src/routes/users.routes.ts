import express from 'express';
import service from '../services/users.service'; 
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id); 
        const user = await service.getUserById(id as any);
        
        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;