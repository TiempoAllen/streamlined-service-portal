// package com.example.streamlined.backend.DTO;


// import javax.validation.constraints.NotBlank;
// import javax.validation.constraints.Size;

// public class UpdatePasswordDTO {

//     @NotBlank(message = "Old password is required")
//     private String oldPassword;

//     @NotBlank(message = "New password is required")
//     @Size(min = 8, message = "New password must be at least 8 characters long")
//     private String newPassword;

//     @NotBlank(message = "Confirm password is required")
//     private String confirmPassword;

//     // Getters and Setters

//     public String getOldPassword() {
//         return oldPassword;
//     }

//     public void setOldPassword(String oldPassword) {
//         this.oldPassword = oldPassword;
//     }

//     public String getNewPassword() {
//         return newPassword;
//     }

//     public void setNewPassword(String newPassword) {
//         this.newPassword = newPassword;
//     }

//     public String getConfirmPassword() {
//         return confirmPassword;
//     }

//     public void setConfirmPassword(String confirmPassword) {
//         this.confirmPassword = confirmPassword;
//     }
// }
