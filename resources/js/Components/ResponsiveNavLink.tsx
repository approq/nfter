import { Method } from "@inertiajs/core";
import { Link } from "@inertiajs/react";

interface Properties {
    method?: Method;
    as?: string;
    href?: string;
    active?: boolean;
    children?: React.ReactNode;
}

export default function ResponsiveNavLink({
    method = Method.GET,
    as = "a",
    href = "",
    active = false,
    children,
}: Properties): JSX.Element {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`flex w-full items-start border-l-4 py-2 pl-3 pr-4 ${
                active
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none`}
        >
            {children}
        </Link>
    );
}
