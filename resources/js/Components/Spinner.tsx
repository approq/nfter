interface Properties {
    children: React.ReactNode;
    className?: string;
}

export default function Spinner({ className = "", children }: Properties): JSX.Element {
    return (
        <div className={"mb-4 flex items-center font-bold"}>
            <span
                className={
                    `h-6 w-6 animate-spin rounded-full border-4 border-primary-100 border-r-primary-600` + className
                }
            />
            <p className={"ml-3"}>{children}</p>
        </div>
    );
}
