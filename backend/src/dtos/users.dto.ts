export class UserResponseDto {
    id: any;
    name: any;
    role: any;
    group: any;
    constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.role = user.role;
        this.group = user.group;
    }
}
export class CreateUserDto {
    static validate(data: any) {
        const errors: string[] = [];
        if (!data.name || data.name.length < 2) {
            errors.push("Ім'я користувача має містити мінімум 2 символи");
        }
        if (!data.role) {
            errors.push("Роль користувача є обов'язковою");
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}