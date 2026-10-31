package devPilot.backend.services.indexing;

import java.util.Locale;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class CodeFileFilter {

    private static final Set<String> SKIP_DIR_PARTS = Set.of(
            "node_modules",
            ".git",
            "dist",
            "build",
            "target",
            ".next",
            "vendor",
            "__pycache__",
            ".idea",
            ".vscode",
            "coverage",
            "out"
    );

    private static final Set<String> SKIP_FILENAMES = Set.of(
            "package-lock.json",
            "yarn.lock",
            "pnpm-lock.yaml",
            "bun.lockb",
            "bun.lock",
            "gradlew",
            "mvnw"
    );

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            "java", "kt", "kts", "scala", "gradle",
            "ts", "tsx", "js", "jsx", "mjs", "cjs",
            "py", "go", "rs", "rb", "php",
            "c", "h", "cpp", "hpp", "cs",
            "swift", "mm",
            "md", "mdx", "txt",
            "yml", "yaml", "json", "toml", "xml",
            "properties",
            "sql",
            "sh", "bash", "zsh",
            "html", "css", "scss", "sass",
            "vue", "svelte"
    );

    public boolean isEligible(String path, long sizeBytes, long maxFileBytes) {

        if (path == null || path.isBlank()) {
            return false;
        }

        String normalized = path.replace('\\', '/');
        String lower = normalized.toLowerCase(Locale.ROOT);

        // Skip dependency, build and generated directories
        for (String part : lower.split("/")) {
            if (SKIP_DIR_PARTS.contains(part)) {
                return false;
            }
        }

        // Extract filename
        String fileName = lower.substring(lower.lastIndexOf('/') + 1);

        // Skip unwanted files
        if (SKIP_FILENAMES.contains(fileName)) {
            return false;
        }

        // Skip hidden files
        if (fileName.startsWith(".")) {
            return false;
        }

        // Skip empty or oversized files
        if (sizeBytes < 0 || sizeBytes > maxFileBytes) {
            return false;
        }

        // Allow special files without extensions
        if ("dockerfile".equals(fileName) ||
                "makefile".equals(fileName)) {
            return true;
        }

        // Check file extension
        int dot = fileName.lastIndexOf('.');

        if (dot < 0 || dot == fileName.length() - 1) {
            return false;
        }

        String ext = fileName.substring(dot + 1);

        return ALLOWED_EXTENSIONS.contains(ext);
    }

   
public String detectLanguage(String filePath) {

    if (filePath == null || filePath.isBlank()) {
        return "unknown";
    }

    String normalized = filePath.replace('\\', '/');

    String fileName = normalized.substring(
            normalized.lastIndexOf('/') + 1
    ).toLowerCase(Locale.ROOT);

    if (fileName.equals("dockerfile")) return "docker";
    if (fileName.equals("makefile")) return "makefile";

    int dot = fileName.lastIndexOf('.');

    if (dot < 0 || dot == fileName.length() - 1) {
        return "unknown";
    }

    String ext = fileName.substring(dot + 1);

    return switch (ext) {
        case "java" -> "java";
        case "kt", "kts" -> "kotlin";
        case "scala" -> "scala";
        case "gradle" -> "gradle";
        case "js", "jsx", "mjs", "cjs" -> "javascript";
        case "ts", "tsx" -> "typescript";
        case "py" -> "python";
        case "go" -> "go";
        case "rs" -> "rust";
        case "rb" -> "ruby";
        case "php" -> "php";
        case "c", "h" -> "c";
        case "cpp", "hpp" -> "cpp";
        case "cs" -> "csharp";
        case "swift" -> "swift";
        case "html" -> "html";
        case "css" -> "css";
        case "scss", "sass" -> "scss";
        case "vue" -> "vue";
        case "svelte" -> "svelte";
        case "sql" -> "sql";
        case "json" -> "json";
        case "yml", "yaml" -> "yaml";
        case "xml" -> "xml";
        case "toml" -> "toml";
        case "properties" -> "properties";
        case "md", "mdx" -> "markdown";
        case "txt" -> "text";
        case "sh", "bash", "zsh" -> "shell";
        default -> ext;
    };
}

}
