
import { Badge } from "@/components/ui/badge";
import { LanguageIcon } from "@/components/icons/language-icon";
import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language?: string | null;
  className?: string;
  showIcon?: boolean;
}

const languageStyles: Record<string, string> = {
  typescript: "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  javascript: "border-yellow-500/25 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  java: "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  python: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  go: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  rust: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "c++": "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  c: "border-slate-500/25 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  "c#": "border-violet-500/25 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  php: "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-400",
  ruby: "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-400",
  swift: "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  kotlin: "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-400",
  dart: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  html: "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  css: "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  vue: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  svelte: "border-orange-500/25 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  shell: "border-green-500/25 bg-green-500/10 text-green-700 dark:text-green-400",
  dockerfile: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-400",
};

function normalizeLanguage(language: string) {
  return language.trim().toLowerCase();
}

export function LanguageBadge({
  language,
  className,
  showIcon = true,
}: LanguageBadgeProps) {
  if (!language?.trim()) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "gap-1.5 rounded-full border-dashed px-2.5 py-1 text-xs font-normal text-muted-foreground",
          className
        )}
      >
        Not detected
      </Badge>
    );
  }

  const normalized = normalizeLanguage(language);
  const style = languageStyles[normalized];

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        style ?? "border-border bg-muted/50 text-foreground",
        className
      )}
    >
      {showIcon && (
        <LanguageIcon
          language={language}
          className="size-3.5 shrink-0"
          aria-hidden="true"
        />
      )}

      <span className="leading-none">{language}</span>
    </Badge>
  );
}

export default LanguageBadge;
