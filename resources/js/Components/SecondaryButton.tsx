import { type MouseEventHandler, type ReactNode } from "react";

interface Properties {
    children: ReactNode;
    type?: "submit" | "button" | "reset" | undefined;
    processing?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

export default function SecondaryButton({
    type = "button",
    className = "",
    processing = false,
    children,
    onClick,
}: Properties): JSX.Element {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
