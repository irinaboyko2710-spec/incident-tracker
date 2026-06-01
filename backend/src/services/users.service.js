const userRepository = require('../repositories/users.repository');
class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }
    async createUser(data) {
        return await userRepository.create(data);
    }
    async getUserById(id) {
        return await userRepository.findById(id);
    }
}
module.exports = new UserService();