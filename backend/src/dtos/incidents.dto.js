class IncidentResponseDto {
    constructor(model) {
        this.id = model.id;
        this.date = model.date;
        this.tag = model.tag;
        this.severity = model.severity;
        this.comments = model.comments;
        this.reporter = model.reporter;
    }
}
class CreateIncidentDto {
    static validate(data) {
        const errors = [];
        if (!data.date) errors.push("Поле 'date' (ISO рядок) є обов'язковим");
        if (!data.tag || data.tag.length < 3) errors.push("Tag має бути мінімум 3 символи");
        const allowedSeverity = ['Low', 'Medium', 'High'];
        if (!allowedSeverity.includes(data.severity)) {
            errors.push(`Severity має бути одним з: ${allowedSeverity.join(',')}`);
        }
        return { isValid: errors.length === 0, errors };
    }
}
module.exports = { IncidentResponseDto, CreateIncidentDto };