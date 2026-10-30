package devPilot.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import devPilot.backend.security.CurrentUser;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.*;
import devPilot.backend.dto.UserResponse;
import org.springframework.http.ResponseEntity;
import devPilot.backend.security.AppUserPrincipal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final CurrentUser currentUser;

    @GetMapping("/login-url")
    public Map<String, String> loginUrl(){
        return Map.of("url", "/oauth2/authorization/github");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        AppUserPrincipal userPrincipal = currentUser.require();
        UserResponse userResponse = new UserResponse(
            userPrincipal.getId(),
            userPrincipal.getGithubId(),
            userPrincipal.getGithubUsername(),
            userPrincipal.getDisplayName(),
            userPrincipal.getAvatarUrl()
        );
        return ResponseEntity.ok(userResponse);
    }
}
