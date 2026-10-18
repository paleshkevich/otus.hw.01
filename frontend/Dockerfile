# Dockerfile для frontend-приложения с многоэтапной сборкой
# и поддержкой работы в Podman (rootless)

# Этап сборки (build stage)
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы конфигурации и зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходные коды
COPY . .

# Собираем проект
RUN npm run build

# Этап выполнения (runtime stage)
FROM nginxinc/nginx-unprivileged:alpine

# Удаляем дефолтную конфигурацию Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Копируем собранные статические файлы из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт 8080
EXPOSE 8080

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]