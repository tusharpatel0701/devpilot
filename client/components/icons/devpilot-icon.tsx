import type { SVGProps } from "react";

export function DevPilotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            aria-label="DevPilot logo"
            role="img"
            {...props}
        >
            <defs>
                <linearGradient
                    id="devpilot-icon-gradient"
                    x1="5"
                    y1="5"
                    x2="59"
                    y2="59"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.6" stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#2563EB" />
                </linearGradient>

                <radialGradient
                    id="devpilot-icon-shine"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(16 10) rotate(45) scale(48)"
                >
                    <stop stopColor="white" stopOpacity="0.35" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Tile */}
            <rect
                x="3"
                y="3"
                width="58"
                height="58"
                rx="17"
                fill="url(#devpilot-icon-gradient)"
            />
            <rect
                x="3"
                y="3"
                width="58"
                height="58"
                rx="17"
                fill="url(#devpilot-icon-shine)"
            />

            {/* Code lines streaming into the pilot */}
            <g stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.6">
                <path d="M11 25H19" />
                <path d="M11 32H24" />
                <path d="M11 39H19" />
            </g>

            {/* Navigation arrow: the "pilot" */}
            <path
                d="M25 17L53 32L25 47L32 32Z"
                fill="white"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* AI sparkle */}
            <path
                d="M49 9L50.6 13.4L55 15L50.6 16.6L49 21L47.4 16.6L43 15L47.4 13.4Z"
                fill="white"
            />
        </svg>
    );
}