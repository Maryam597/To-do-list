package com.todolist.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todolist.backend.dto.LoginRequest;
import com.todolist.backend.dto.RegisterRequest;
import com.todolist.backend.model.User;
import com.todolist.backend.model.Role;
import com.todolist.backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.ActiveProfiles;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.springframework.test.web.servlet.MockMvc;
import jakarta.validation.Valid;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @SpringBootTest(classes = {SecurityConfig.class})
@SpringBootTest
@AutoConfigureMockMvc
@Commit
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthenticationManager authenticationManager;


@Test
public void testUserRegistration() {

    try {
    RegisterRequest request = new RegisterRequest();
    request.setUsername("testuser");
    request.setEmail("testuser@example.com");
    request.setPassword("testpass");

    

    mockMvc.perform(post("/api/users/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andDo(print())  // <-- ici la méthode print() devient accessible
            .andExpect(status().isCreated());
    } catch (Exception e) {
        e.printStackTrace();
        fail("Exception:" + e.getMessage());
    }


}


}
