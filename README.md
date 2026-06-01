# Лабораторна робота №2: Розробка REST API (Бекенд без БД)

Даний проект реалізує серверний додаток для моніторингу та керування інцидентами інформаційної безпеки. API побудовано на Node.js з використанням Express та дотриманням архітектури багатошарового застосунку (Layered Architecture).

## Як запустити проект

**Встановлення залежностей:**
Переконайтеся, що ви знаходитесь у папці backend, та виконайте:
npm install
**Запуск сервера:** 
node src/index.js
Сервер працюватиме за адресою: http://localhost:3000
## Реалізовані сутності 
Проект реалізує повний CRUD-цикл для наступних сутностей:

* Users — користувачі (Admin встановлений за замовчуванням: Iryna Boiko).

* Incidents — записи про виявлені загрози.

* Поля: id, date, tag, severity, comments, reporter.

**Код структурований за функціональним призначенням:**

* Routes — визначення маршрутів API.

* Controllers — обробка вхідних HTTP-запитів та валідація даних.

* Services — реалізація бізнес-логіки.

* Repositories — керування даними в оперативній пам'яті (In-memory storage).

* DTOs — об'єкти передачі даних.

* Middleware — логування запитів та централізована обробка помилок.

## Приклади запитів (curl) 

1. **Отримання списку всіх інцидентів (GET)**
curl.exe http://localhost:3000/api/incidents
2. **Створення нового інциденту (POST)**
curl.exe -X POST http://localhost:3000/api/incidents -H "Content-Type: application/json" -d "{\"tag\": \"Malware\", \"severity\": \"Medium\", \"reporter\": \"Iryna Boiko\"}"
3. **Оновлення інциденту (PUT)**
curl.exe -X PUT http://localhost:3000/api/incidents/{ID} -H "Content-Type: application/json" -d "{\"tag\": \"Malware\", \"severity\": \"Critical\", \"status\": \"Confirmed\"}"
4. **Видалення інциденту (DELETE)**
curl.exe -X DELETE http://localhost:3000/api/incidents/{ID}
Валідація та помилки
Сервер перевіряє обов'язкові поля. У разі помилки повертається статус 400 Bad Request:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Missing required fields"
  }
}