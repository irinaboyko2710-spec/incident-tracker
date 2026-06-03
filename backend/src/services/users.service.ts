import userRepository from '../repositories/users.repository';
class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }
    async createUser(data: any) {
        return await userRepository.create(data);
    }
    async getUserById(id: number) {
        return await userRepository.findById(id);
    }
}
export default new UserService();