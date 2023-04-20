/* eslint-disable @typescript-eslint/strict-boolean-expressions */
interface Properties {
    forInput: string;
    value: string;
    className?: string;
    children?: React.ReactNode;
}

export default function InputLabel({ forInput, value, className, children }: Properties): JSX.Element {
    return (
        <label
            htmlFor={forInput}
            className={`block text-sm font-medium text-gray-700 ${className}`}
        >
            {value || children}
        </label>
    );
}
