class UsersRepository {
    constructor() {
        this.users = [
            { id: 1, name: "Irina Boiko", role: "Admin", email: "irina@cyber.local" }
        ];
    }
    findAll() { return this.users; }
    create(data) {
        const newUser = { id: Date.now(), ...data };
        this.users.push(newUser);
        return newUser;
    }
}
module.exports = new UsersRepository();