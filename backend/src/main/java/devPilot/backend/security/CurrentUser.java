package devPilot.backend.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.core.context.SecurityContextHolder;

@Component
public class CurrentUser {
    
    public AppUserPrincipal require() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof AppUserPrincipal)) {
            throw new IllegalStateException("No authenticated user");
        }
        return (AppUserPrincipal) auth.getPrincipal();
    }
}
