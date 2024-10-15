package com.example.streamlined.backend.DTO;

import java.sql.Timestamp;

import com.example.streamlined.backend.Entity.UserEntity;

public class ConversationDTO {

    private Long conversationId;
    private UserEntity otherUser;
    private Long lastMessageId;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    
    public Long getConversationId() {
        return conversationId;
    }
    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }
    public UserEntity getOtherUser() {
        return otherUser;
    }
    public void setOtherUser(UserEntity otherUser) {
        this.otherUser = otherUser;
    }
    public Long getLastMessageId() {
        return lastMessageId;
    }
    public void setLastMessageId(Long lastMessageId) {
        this.lastMessageId = lastMessageId;
    }
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    
}
