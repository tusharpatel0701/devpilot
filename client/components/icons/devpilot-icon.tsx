
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
                    <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
            </defs>

            <rect
                x="3"
                y="3"
                width="58"
                height="58"
                rx="17"
                fill="url(#devpilot-icon-gradient)"
            />

            {/* Code brackets */}
            <path
                d="M23 21L13 32L23 43"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M41 21L51 32L41 43"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Central D-shaped pilot mark */}
            <path
                d="M29 20H33C40 20 44 24.5 44 32C44 39.5 40 44 33 44H29V20Z"
                fill="white"
            />

            <path
                d="M29 27L24 32L29 37"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
