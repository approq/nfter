interface Properties {
    children: React.ReactNode;
    type?: "submit" | "button" | "reset" | undefined;
    processing: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function PrimaryButton({
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
                `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
