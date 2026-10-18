# rulles.md

## Архитектура и endpoint
- Проект развернут в монорепозитории (`/backend` и `/frontend`).
- Бэкенд построен на встроенном `com.sun.net.httpserver.HttpServer`.
- Основные эндпоинты:
    - `GET /api/questions` — получение списка вопросов.
    - `POST /api/answers` — отправка ответа на вопрос.

## Спецификации Backend (/backend)
- **Стек:** Java 21, Maven, библиотека **Google Gson** для работы с JSON.
- Использование сторонних веб-фреймворков (Spring, Quarkus, Jakarta) **запрещено**.
- **Сериализация:** Для превращения объектов/коллекций в JSON и обратно использовать `new Gson().toJson()` и `new Gson().fromJson()`.
- **CORS:** Каждый HTTP-ответ должен содержать заголовки CORS (Access-Control-Allow-Origin: *), а также корректно обрабатывать Preflight-запросы (HTTP метод OPTIONS).
- **Модели данных:** Использовать Java Records для моделей `Question` и `Answer`.

## Спецификации Frontend (/frontend)
- **Стек:** React, fetch API для сетевых запросов.
- Запросы на получение вопросов отправлять на `GET /api/questions`.
- Запросы на отправку ответов отправлять на `POST /api/answers`.
