class IncidentsRepository {
    constructor() {
    this.incidents = [
        { id: 1, date: "2026-03-19", tag: "Phishing", severity: "High", comments: "Тест", reporter: "Iryna Boiko" },
        { id: 2, date: "2026-03-19", tag: "DDoS", severity: "Critical", comments: "Атака", reporter: "Iryna Boiko" }
    ];
}

    findAll() {
        return this.incidents;
    }

    findById(id) {
        return this.incidents.find(i => i.id === id);
    }

    create(data) {
        const newIncident = { id: Date.now(), ...data };
        this.incidents.push(newIncident);
        return newIncident;
    }

    delete(id) {
        const index = this.incidents.findIndex(i => i.id === id);
        if (index === -1) return false;
        this.incidents.splice(index, 1);
        return true;
    }
}

module.exports = new IncidentsRepository();