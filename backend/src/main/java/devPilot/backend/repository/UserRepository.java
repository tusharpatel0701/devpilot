package devPilot.backend.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import devPilot.backend.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByGithubId(Long githubId);
}
