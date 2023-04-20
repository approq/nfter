import { forwardRef, useEffect, useRef } from "react";

interface Properties {
    type?: string;
    name?: string;
    id: string | undefined;
    value: string;
    className?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    placeHolder?: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default forwardRef(function TextInput(
    { type = "text", name, id, value, className, autoComplete, required, isFocused = false, handleChange }: Properties,
    reference,
): JSX.Element {
    const input = reference != null || useRef();

    useEffect(() => {
        if (isFocused) {
            /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
            // @ts-ignore
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
                // @ts-ignore
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(event) => {
                    handleChange(event);
                }}
            />
        </div>
    );
});
