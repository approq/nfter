import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useMetaMaskContext } from "@/Contexts/MetaMaskContext";

interface Properties {
    children: React.ReactNode;
}

export default function Guest({ children }: Properties): JSX.Element {
    const { connectWallet } = useMetaMaskContext();
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>

            <button
                onClick={() => {
                    connectWallet();
                }}
            >
                Connect MetaMask
            </button>
        </div>
    );
}
