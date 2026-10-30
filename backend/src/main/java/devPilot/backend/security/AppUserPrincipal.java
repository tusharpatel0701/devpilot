package devPilot.backend.security;

import devPilot.backend.entity.User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class AppUserPrincipal implements OAuth2User {

    private final User user;
    private final Map<String, Object> attributes;

    public AppUserPrincipal(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_USER")
        );
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return user.getGithubUsername();
    }

    public User getUser() {
        return user;
    }

    public String getGithubUsername() {
        return user.getGithubUsername();
    }

    public Long getGithubId() {
        return user.getGithubId();
    }

    public String getDisplayName() {
        return user.getDisplayName();
    }

    public String getAvatarUrl() {
        return user.getAvatarUrl();
    }

    public java.util.UUID getId() {
        return user.getId();
    }
}
