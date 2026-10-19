# Full-Stack Приложение: OTUS Homework

## 📌 Краткое описание стека

- **Backend**: Java 21 (чистый Java Core + `com.sun.net.httpserver.HttpServer` + `Google Gson`)
- **Frontend**: React + TypeScript + Vite + Nginx

---

## 🚀 Запуск приложения

### через Podman (рекомендуется)
```bash
podman-compose up --build
```

### через Docker (альтернатива)
```bash
docker compose up --build
```

### Остановка приложения
```bash
podman-compose down
```

---

## 🌐 Проверка работоспособности

Откройте в браузере:

- **Фронтенд**: [http://localhost:3000](http://localhost:3000)
- **Бэкенд (список вопросов)**: [http://localhost:8080/api/questions](http://localhost:8080/api/questions)

---

## 🔌 Описание API

### Эндпоинты

#### 1. Получение списка вопросов
```http
GET /api/questions
```
**Ответ**: JSON-массив объектов `Question` с полями `id` и `text`.

---

#### 2. Отправка ответа на вопрос
```http
POST /api/answers
```
**Тело запроса (JSON)**:
```json
{
  "questionId": 1,
  "text": "Текст ответа"
}
```

**Поля**:
- `questionId` (number) — идентификатор вопроса;
- `text` (string) — текст ответа.

---

## 📂 Структура проекта

```
.
├── backend/          # Java 21 + HttpServer + Gson
│   ├── src/          # Исходный код
│   └── Dockerfile    # Контейнер для бэкенда
├── frontend/         # React + TypeScript + Vite + Nginx
│   ├── src/          # Исходный код
│   └── Dockerfile    # Контейнер для фронтенда
└── docker-compose.yml # Оркестрация контейнеров