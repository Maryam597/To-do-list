package com.todolist.backend.dto;

import com.todolist.backend.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Le nom d'utilisateur est obligatoire")
    @Pattern(regexp = "^[a-zA-Z0-9_]{3,20}$", message = "Le nom d'utilisateur doit contenir entre 3 et 20 caractères, sans caractères spéciaux")
    private String username;

    @Email(message = "Email invalide")
    @NotNull(message = "L'email est obligatoire")
    private String email;

    @NotNull(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre")
    private String password;

    private Role role;

    public Role getRole() {
        return role;
    }

}
