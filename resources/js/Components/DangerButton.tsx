interface Properties {
    children: React.ReactNode;
    type?: "submit" | "button" | "reset" | undefined;
    processing?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function DangerButton({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
}: Properties): JSX.Element {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${
                    processing !== undefined && processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
