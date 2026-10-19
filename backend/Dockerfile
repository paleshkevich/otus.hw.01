# Dockerfile для backend-приложения с многоэтапной сборкой
# и поддержкой работы в Podman (rootless)

# Этап сборки (build stage)
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл pom.xml для кэширования зависимостей
COPY pom.xml .

# Копируем исходные коды
COPY src ./src

# Собираем проект
RUN mvn clean package -DskipTests

# Этап выполнения (runtime stage)
FROM eclipse-temurin:21-jre-alpine

# Создаем некорневого пользователя для работы в rootless-режиме
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранный JAR-файл с зависимостями из этапа сборки
COPY --from=build --chown=appuser:appgroup /app/target/app.jar /app/app.jar

# Меняем владельца рабочей директории на некорневого пользователя
RUN chown -R appuser:appgroup /app

# Экспонируем порт 8080
EXPOSE 8080

# Переключаемся на некорневого пользователя
USER appuser

# Запускаем приложение
CMD ["java", "-jar", "app.jar"]