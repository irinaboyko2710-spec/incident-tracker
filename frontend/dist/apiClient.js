const API_URL = "http://localhost:3000/api/v1/incidents";
export const apiClient = {
    async getAll() {
        // ДОДАЄМО ЦЕЙ РЯДОК
        console.log("Спроба отримати дані з сервера...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch(API_URL, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw await this.formatError(response);
            }
            const data = await response.json();
            // ДОДАЄМО ЦЕЙ РЯДОК
            console.log("Дані отримано:", data);
            return data;
        }
        catch (err) {
            throw this.handleNetworkError(err);
        }
    },
    async create(data) {
        console.log("Надсилання нового інциденту на сервер...", data);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw await this.formatError(response);
            }
            const result = await response.json();
            console.log("Інцидент успішно збережено в базі:", result);
            return result;
        }
        catch (err) {
            throw this.handleNetworkError(err);
        }
    },
    async remove(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw await this.formatError(response);
            }
            console.log(`Інцидент з ID ${id} видалено`);
        }
        catch (err) {
            throw this.handleNetworkError(err);
        }
    },
    async formatError(response) {
        const data = await response.json().catch(() => ({}));
        return {
            status: response.status,
            title: response.status >= 500 ? "Помилка сервера" : "Помилка запиту",
            detail: data.message || data.detail || "Щось пішло не так"
        };
    },
    handleNetworkError(err) {
        if (err.name === 'AbortError') {
            return { status: 408, title: "Таймаут", detail: "Сервер занадто довго не відповідав" };
        }
        return { status: 0, title: "Зв'язок відсутній", detail: "Неможливо з'єднатися з сервером. Перевірте, чи запущений backend." };
    }
};
