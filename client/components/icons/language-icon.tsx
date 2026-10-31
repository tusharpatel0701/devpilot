
import type { SVGProps } from "react";
import {
  Code2,
  FileCode2,
  Terminal,
  Braces,
  Database,
} from "lucide-react";

interface LanguageIconProps extends SVGProps<SVGSVGElement> {
  language: string;
  colored?: boolean;
  variant?: "plain" | "tile";
}

const languageColors: Record<string, string> = {
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  python: "#3776AB",
  java: "#E76F00",
  go: "#00ADD8",
  rust: "#DEA584",
  ruby: "#CC342D",
  php: "#777BB4",
  swift: "#F05138",
  kotlin: "#7F52FF",
  dart: "#0175C2",
  html: "#E34F26",
  css: "#1572B6",
  c: "#A8B9CC",
  "c++": "#00599C",
  "c#": "#68217A",
  vue: "#42B883",
  svelte: "#FF3E00",
  dockerfile: "#2496ED",
  shell: "#4EAA25",
  bash: "#4EAA25",
  sql: "#4479A1",
};

const fileLanguages = new Set([
  "javascript", "typescript", "python", "java", "go", "rust",
  "ruby", "php", "swift", "kotlin", "dart", "html", "css",
  "c", "c++", "c#", "vue", "svelte",
]);

export function LanguageIcon({
  language,
  colored = true,
  variant = "plain",
  className,
  ...svgProps
}: LanguageIconProps) {
  const key = language.trim().toLowerCase();
  const color = colored ? languageColors[key] : undefined;
  const isTile = variant === "tile";

  const Icon = ["bash", "shell", "powershell", "sh"].includes(key)
    ? Terminal
    : ["json", "yaml", "toml"].includes(key)
      ? Braces
      : ["sql", "plsql"].includes(key)
        ? Database
        : fileLanguages.has(key)
          ? FileCode2
          : Code2;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${language} language`}
      role="img"
      {...svgProps}
    >
      {isTile && (
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="6"
          fill={color ?? "currentColor"}
          fillOpacity="0.12"
        />
      )}
      <Icon
        x={isTile ? 5 : 3}
        y={isTile ? 5 : 3}
        width={isTile ? 14 : 18}
        height={isTile ? 14 : 18}
        stroke={color ?? "currentColor"}
        strokeWidth={1.8}
      />
    </svg>
  );
}

export default LanguageIcon;
