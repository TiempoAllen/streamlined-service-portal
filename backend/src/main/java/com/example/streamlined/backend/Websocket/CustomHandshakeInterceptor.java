// package com.example.streamlined.backend.Websocket;

// import java.util.Map;
// import org.springframework.http.server.ServerHttpRequest;
// import org.springframework.http.server.ServerHttpResponse;
// import org.springframework.web.socket.WebSocketHandler;
// import org.springframework.web.socket.server.HandshakeInterceptor;

// public class CustomHandshakeInterceptor {
//     @Override
//     public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, 
//                                    WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//         // Extract query parameters, headers, or cookies for authentication
//         String userId = getUser_id(request);  // Extract from query params, headers, etc.

//         if (isValidUser(userId)) {
//             attributes.put("userId", userId);  // Attach user info to WebSocket session attributes
//             return true;  // Allow the handshake
//         } else {
//             return false;  // Reject the handshake
//         }
//     }

//     @Override
//     public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, 
//                                WebSocketHandler wsHandler, Exception exception) {
//         // After handshake logic if necessary
//     }

//     // Helper method to extract userId from request
//     private String getUserIdFromRequest(ServerHttpRequest request) {
//         // Extract user ID from query params, headers, or cookies (e.g., from Authorization header)
//         return request.getHeaders().getFirst("userId"); // Example of extracting from headers
//     }

//     // Helper method to validate the user
//     private boolean isValidUser(String userId) {
//         // Perform user validation logic (e.g., check JWT token or userId against the database)
//         return userId != null && !userId.isEmpty();  // Example validation
//     }
// }
