import { useState } from "react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { useMetaMaskContext } from "@/Contexts/MetaMaskContext";
import GuestLayout from "@/Layouts/GuestLayout";

interface Properties {
    message: string;
}
export default function Guest({ message }: Properties): JSX.Element {
    const { connectWallet, allowedChainId, errorMessage } = useMetaMaskContext();
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const connect = (): void => {
        if (allowedChainId()) {
            setShowError(false);
        } else {
            setShowError(true);
            return;
        }

        setLoading(true);

        connectWallet(message)
            .catch(() => {
                setShowError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <GuestLayout
            loading={loading}
            connect={connect}
        >
            <div className={"flex flex-col items-center"}>
                <div className={"mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF8EB]"}>
                    <img
                        src="/images/metamask.svg"
                        alt="metamask"
                    />
                </div>

                <h1 className={"mb-0.5 text-2xl font-bold"}>Welcome</h1>
                <p className={"mb-4 text-sm font-semibold text-secondary-700"}>
                    Connect your wallet via MetaMask to continue
                </p>

                {loading ? (
                    <Spinner>Connecting ...</Spinner>
                ) : (
                    <PrimaryButton
                        type={"button"}
                        onClick={connect}
                        processing={loading}
                        className={"mb-4"}
                    >
                        Connect Wallet
                    </PrimaryButton>
                )}

                {showError && (
                    <div className={"rounded-xl bg-red-50 px-6 py-3 sm:max-w-sm"}>
                        <h3 className={"mb-2 inline-flex items-center font-bold text-red-600"}>
                            <img
                                src="/images/error.svg"
                                alt="error"
                                className={"mr-2"}
                            />
                            Error
                        </h3>

                        <p className={"text-sm font-semibold text-secondary-700"}>
                            {errorMessage ?? "There was a problem connecting the wallet to the NFTer, try again."}
                        </p>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
