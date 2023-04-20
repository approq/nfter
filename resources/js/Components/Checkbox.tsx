interface Properties {
    name: string;
    value: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Checkbox({ name, value, handleChange }: Properties): JSX.Element {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={(event) => {
                handleChange(event);
            }}
        />
    );
}
