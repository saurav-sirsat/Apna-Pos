package com.zosh.payload.dto;

import com.zosh.domain.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserDTO {
    private Long id;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private String phone;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Role is required")
    private UserRole role;
    private String username;
    private Long storeId;
    private Long branchId;
    private BranchDTO branch;
    private String branchName;
    private LocalDateTime lastLogin;



    public UserDTO(Long id, String email, String fullName,
                   UserRole role, String branchName,
                   LocalDateTime lastLogin) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.password = null;
        this.phone = null;
        this.username = null;
        this.storeId = null;
        this.branchId = null;
        this.branch = null;
        this.branchName=branchName;
        this.lastLogin=lastLogin;

    }
}
