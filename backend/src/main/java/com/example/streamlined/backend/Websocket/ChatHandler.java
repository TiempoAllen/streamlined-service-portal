// package com.example.streamlined.backend.Websocket;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.example.streamlined.backend.Entity.ConversationEntity;
// import com.example.streamlined.backend.Entity.MessageEntity;
// import com.example.streamlined.backend.Entity.UserEntity;
// import com.example.streamlined.backend.Repository.ConversationRepository;
// import com.example.streamlined.backend.Repository.MessageRepository;
// import com.example.streamlined.backend.Repository.UserRepository;
// import com.example.streamlined.backend.DTO.ConversationDTO;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;
// import org.springframework.web.socket.CloseStatus;
// import org.springframework.web.socket.TextMessage;
// import org.springframework.web.socket.WebSocketSession;
// import org.springframework.web.socket.handler.TextWebSocketHandler;

// import java.io.IOException;
// import java.sql.Timestamp;
// import java.time.LocalDateTime;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.Optional;

// @Component
// public class ChatHandler extends TextWebSocketHandler {

//     @Autowired
//     private UserRepository userRepository; // Repository for UserEntity

//     @Autowired
//     private MessageRepository messageRepository; // Repository for MessageEntity

//     @Autowired
//     private ConversationRepository conversationRepository; // Repository for ConversationEntity

//     private final ObjectMapper objectMapper = new ObjectMapper();
//     private final Map<String, WebSocketSession> userSessions = new HashMap<>();

//     @Override
//     public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//         String userId = getUserIdFromSession(session); // Extract userId from session
//         Optional<UserEntity> user = userRepository.findByUserId(Long.parseLong(userId));
//         if (user.isPresent()) {
//             userSessions.put(user.get().getUser_id().toString(), session);
//             System.out.println("New connection established: " + user.get().getUser_id());
//         } else {
//             throw new IllegalStateException("User not found");
//         }
//     }

//     @Override
//     protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//         String payload = message.getPayload();
//         MessageEntity messageEntity = objectMapper.readValue(payload, MessageEntity.class);

//         // Set timestamp for the message
//         messageEntity.setTimestamp(Timestamp.valueOf(LocalDateTime.now()));

//         // Extract sender_id and receiver_id from messageEntity
//         String senderId = messageEntity.getSender_id().toString();
//         String receiverId = messageEntity.getReceiver_id().toString();

//         // Ensure both sender and receiver are valid
//         Optional<UserEntity> senderUser = userRepository.findByUserId(Long.parseLong(senderId));
//         Optional<UserEntity> receiverUser = userRepository.findByUserId(Long.parseLong(receiverId));

//         if (receiverUser.isPresent() && senderUser.isPresent()) {
//             // Handle conversation
//             handleConversation(senderId, receiverId, messageEntity);

//             // Send message to the receiver
//             WebSocketSession receiverSession = userSessions.get(receiverId);
//             if (receiverSession != null && receiverSession.isOpen()) {
//                 String messageJson = objectMapper.writeValueAsString(messageEntity);
//                 receiverSession.sendMessage(new TextMessage(messageJson));
//             }
//         }
//     }

//     @Override
//     public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//         // Remove user session
//         userSessions.entrySet().removeIf(entry -> entry.getValue().equals(session));
//         System.out.println("Connection closed.");
//     }

//     private String getUserIdFromSession(WebSocketSession session) {
//         // Implement logic to extract userId from session, e.g., using session attributes or a token
//         return Optional.ofNullable(session.getAttributes().get("userId"))
//                 .map(Object::toString)
//                 .orElseThrow(() -> new IllegalStateException("User ID not found in session"));
//     }

//     private void handleConversation(String senderId, String receiverId, MessageEntity messageEntity) {
//         // Find or create conversation
//         Optional<ConversationEntity> conversation = conversationRepository
//                 .findByUser1IdOrUser2Id(Long.parseLong(senderId), Long.parseLong(receiverId))
//                 .stream()
//                 .findFirst();

//         if (conversation.isEmpty()) {
//             // Create new conversation
//             ConversationEntity newConversation = new ConversationEntity();
//             newConversation.setUser1Id(Long.parseLong(senderId));
//             newConversation.setUser2Id(Long.parseLong(receiverId));
//             newConversation.setLastMessageId(messageEntity.getMessage_id());
//             newConversation.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
//             newConversation.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));

//             conversationRepository.save(newConversation);
//         } else {
//             // Update existing conversation
//             ConversationEntity existingConversation = conversation.get();
//             existingConversation.setLastMessageId(messageEntity.getMessage_id());
//             existingConversation.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));

//             conversationRepository.save(existingConversation);
//         }
//     }
// }
