package ru.otus.backend;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import ru.otus.models.Question;
import ru.otus.models.Answer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/questions", new QuestionHandler());
        server.createContext("/api/answers", new AnswerHandler());

        server.setExecutor(null);
        server.start();

        System.out.println("Server started on port 8080");
    }

    static class QuestionHandler implements HttpHandler {
        private static final Gson gson = new Gson();
        private static final List<Question> questions = List.of(
            new Question(1, "Какой известный цикл картин Оскара Клода Моне посвящен цветущим садам?"),
            new Question(2, "В каком году Оскар Клод Моне написал свою знаменитую картину 'Впечатление. Восход солнца'?"),
            new Question(3, "Какой стиль живописи ассоциируется с Оскаром Клодом Моне?"),
            new Question(4, "Где находится музей, посвящённый Оскару Клоду Моне и его саду с водяными лилиями?"),
            new Question(5, "Какое произведение Оскара Клода Моне изображает собор в Руане в разное время суток?")
        );

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = gson.toJson(questions);
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }
    }

    static class AnswerHandler implements HttpHandler {
        private static final Gson gson = new Gson();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            InputStream requestBody = exchange.getRequestBody();
            String body = new String(requestBody.readAllBytes(), StandardCharsets.UTF_8);
            Answer answer = gson.fromJson(body, Answer.class);

            String response = gson.toJson(new java.util.HashMap<String, String>() {{
                put("status", "success");
            }});

            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }
    }
}
