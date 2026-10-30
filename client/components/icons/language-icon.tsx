import type { SVGProps } from "react";
import {
  siJavascript,
  siTypescript,
  siPython,
  siJava,
  siC,
  siCplusplus,
  siCsharp,
  siGo,
  siRust,
  siRuby,
  siPhp,
  siSwift,
  siKotlin,
  siDart,
  siHtml5,
  siCss3,
  siSass,
  siLess,
  siLua,
  siPerl,
  siR,
  siScala,
  siHaskell,
  siElixir,
  siErlang,
  siClojure,
  siFsharp,
  siFortran,
  siJulia,
  siSolidity,
  siWebassembly,
  siGnubash,
  siPowershell,
  siMarkdown,
  siJson,
  siYaml,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const LANGUAGE_ICONS: Record<string, SimpleIcon> = {
  javascript: siJavascript,
  js: siJavascript,
  typescript: siTypescript,
  ts: siTypescript,
  python: siPython,
  py: siPython,
  java: siJava,
  c: siC,
  "c++": siCplusplus,
  cpp: siCplusplus,
  cxx: siCplusplus,
  "c#": siCsharp,
  csharp: siCsharp,
  cs: siCsharp,
  go: siGo,
  golang: siGo,
  rust: siRust,
  ruby: siRuby,
  rb: siRuby,
  php: siPhp,
  swift: siSwift,
  kotlin: siKotlin,
  kt: siKotlin,
  dart: siDart,
  html: siHtml5,
  html5: siHtml5,
  css: siCss3,
  css3: siCss3,
  scss: siSass,
  sass: siSass,
  less: siLess,
  lua: siLua,
  perl: siPerl,
  r: siR,
  scala: siScala,
  haskell: siHaskell,
  hs: siHaskell,
  elixir: siElixir,
  ex: siElixir,
  erlang: siErlang,
  clojure: siClojure,
  clj: siClojure,
  "f#": siFsharp,
  fsharp: siFsharp,
  fortran: siFortran,
  julia: siJulia,
  solidity: siSolidity,
  sol: siSolidity,
  webassembly: siWebassembly,
  wasm: siWebassembly,
  shell: siGnubash,
  bash: siGnubash,
  sh: siGnubash,
  zsh: siGnubash,
  powershell: siPowershell,
  ps1: siPowershell,
  markdown: siMarkdown,
  md: siMarkdown,
  json: siJson,
  yaml: siYaml,
  yml: siYaml,
};

function normalizeLanguage(language: string): string {
  return language.trim().toLowerCase().replace(/\s+/g, " ");
}

function GenericCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </svg>
  );
}

export interface LanguageIconProps extends SVGProps<SVGSVGElement> {
  /** Language name, preferably the key returned by GitHub's languages API. */
  language: string;
  /** Use the brand color from Simple Icons. Defaults to true. */
  colored?: boolean;
}

export function LanguageIcon({
  language,
  colored = true,
  className,
  ...svgProps
}: LanguageIconProps) {
  const icon = LANGUAGE_ICONS[normalizeLanguage(language)];

  if (!icon) {
    return (
      <GenericCodeIcon
        className={className}
        role="img"
        aria-label={`${language} language`}
        {...svgProps}
      />
    );
  }

  return (
    <svg
      role="img"
      aria-label={`${language} language`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={colored ? `#${icon.hex}` : "currentColor"}
      className={className}
      {...svgProps}
    >
      <path d={icon.path} transform="scale(0.75) translate(4 4)" />
    </svg>
  );
}

export default LanguageIcon;
