package devPilot.backend.services;

import devPilot.backend.entity.User;
import java.util.UUID;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;
import devPilot.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepository;
    public final TextEncryptor tokenEncryptor;

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
