const repository = require('../repositories/users.repository');
class UsersService {
    getAll() { return repository.findAll(); }
    create(data) { return repository.create(data); }
}
module.exports = new UsersService();