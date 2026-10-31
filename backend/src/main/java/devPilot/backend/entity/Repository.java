package devPilot.backend.entity;

import java.util.*;
import java.time.Instant;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor 
@Table(name = "repositories", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "github_rep_id"}))
@Builder
public class Repository {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="user_id" , nullable=false)
    private UUID userId;

    @Column(name="github_rep_id" , nullable=false)
    private Long githubRepoId;

    @Column(nullable=false, length = 100)
    private String owner;

    @Column(nullable=false, length=200)
    private String name;

    @Column(name="full_name" , nullable=false, length = 300)
    private String fullName;

    @Column(name="is_private" , nullable=false)
    private boolean isPrivate;

    @Column(name="default_branch", nullable=false, length = 100)
    private String defaultBranch;

    @Column(name="html_url", length = 500)
    private String htmlUrl;

    @Column(length = 100)
    private String language;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name="index_status", nullable=false, length = 20)
    @Builder.Default
    private IndexStatus indexStatus = IndexStatus.PENDING;

    @Column(name="chunk_count", nullable=false)
    @Builder.Default
    private int chunkCount = 0; 

    @Column(name="files_total", nullable=false)
    @Builder.Default
    private int filesTotal = 0;


    @Column(name="files_processed", nullable=false)
    @Builder.Default
    private int filesProcessed = 0;

    @Column(name="error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "indexed_at")
    private Instant indexedAt;

    @Column(name="created_at", nullable=false, updatable=false)    
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        if(createdAt == null){
            createdAt = now;
        }
        updatedAt = now;
        if(indexStatus == null){
            indexStatus = IndexStatus.PENDING;
        }
    }

}
