interface Properties {
    className?: string;
}

export default function ApplicationLogo({ className }: Properties): JSX.Element {
    return (
        <span className={className}>
            <img
                className={"hidden md:inline-block"}
                src="/images/logo.svg"
                alt="logo"
            />
            <img
                className={"md:hidden"}
                src="/images/logo-mobile.svg"
                alt="logo"
            />
        </span>
    );
}
