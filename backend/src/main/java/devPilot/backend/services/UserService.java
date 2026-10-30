package devPilot.backend.services;

import devPilot.backend.entity.User;
import java.util.UUID;
import java.util.Map;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;
import devPilot.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TextEncryptor tokenEncryptor;

    @Transactional
    public User upsertFromGitHub(Map<String, Object> attributes, String accessToken, String scopes) {

    Long githubId = toLong(attributes.get("id"));

    String login = String.valueOf(attributes.get("login"));

    String name = attributes.get("name") != null
            ? String.valueOf(attributes.get("name"))
            : login;

    String avatarUrl = attributes.get("avatar_url") != null
            ? String.valueOf(attributes.get("avatar_url"))
            : null;

    String encryptedToken = tokenEncryptor.encrypt(accessToken);

    User user = userRepository.findByGithubId(githubId).orElseGet(User::new);

    user.setGithubId(githubId);
    user.setGithubUsername(login);
    user.setDisplayName(name);
    user.setAvatarUrl(avatarUrl);
    user.setAccessToken(encryptedToken);
    user.setTokenScopes(scopes);

    return userRepository.save(user);
    }


    @Transactional(readOnly = true)
    public User requiredId(UUID id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public String decryptAccessToken(User user) {
        return tokenEncryptor.decrypt(user.getAccessToken());
    }

    private static Long toLong(Object value){
        if(value instanceof Number number) {
            return number.longValue();
        }

        return Long.parseLong(String.valueOf(value));
    }

    
}
