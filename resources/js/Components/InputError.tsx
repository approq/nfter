interface Properties {
    message: string | undefined;
    className: string;
}

export default function InputError({ message, className = "" }: Properties): JSX.Element | null {
    return message !== undefined ? <p className={"text-sm text-red-600 " + className}>{message}</p> : null;
}
