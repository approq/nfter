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
                `rounded-lg bg-primary-600 px-5 py-2 font-bold text-white transition-colors hover:bg-primary-700
                active:bg-primary-800 disabled:bg-secondary-200 disabled:text-secondary-500` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
