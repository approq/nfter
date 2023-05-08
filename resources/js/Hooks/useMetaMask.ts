import { type VisitOptions } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { ethers, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { type Ethereum } from "./useMetaMask.contracts";

const hasMetaMask = (): boolean => window.ethereum !== undefined;

const getEthereum = (): Ethereum => window.ethereum as Ethereum;

const isMetaMaskSupportedBrowser = (): boolean => {
    if (hasMetaMask()) {
        return true;
    }

    const isCompatible = /chrome|firefox/.test(navigator.userAgent.toLowerCase());
    const isMobile = /android|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());

    return isCompatible && !isMobile;
};

const allowedNetworks: number[] = [1, 137];

export interface MetaMaskState {
    account?: string;
    chainId?: number;
    connectWallet: (message: string) => Promise<void>;
    allowedChainId: () => boolean;
    scanUrl: () => string;
    connecting: boolean;
    initialized: boolean;
    needsMetaMask: boolean;
    supportsMetaMask: boolean;
    errorMessage?: string;
}

enum ErrorType {
    Generic,
    ProviderMissing,
    InvalidNetwork,
    NoAccount,
    UserRejected,
}

const ErrorTypes = {
    [ErrorType.NoAccount]: "no_account",
    [ErrorType.Generic]: "generic",
    [ErrorType.InvalidNetwork]: "invalid_network",
    [ErrorType.ProviderMissing]: "provider_missing",
    [ErrorType.UserRejected]: "user_rejected",
};

const useMetaMask = (): {
    allowedChainId: () => boolean;
    scanUrl: () => string;
    chainId: number | undefined;
    needsMetaMask: boolean;
    connectWallet: (message: string) => Promise<void>;
    errorMessage: string | undefined;
    initialized: boolean;
    connecting: boolean;
    account: string | undefined;
    supportsMetaMask: boolean
} => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [chainId, setChainId] = useState<number>();
    const [account, setAccount] = useState<string>();
    const [ethereumProvider, setEthereumProvider] = useState<ethers.providers.Web3Provider>();
    const [connecting, setConnecting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const supportsMetaMask = isMetaMaskSupportedBrowser();
    const needsMetaMask = !hasMetaMask() || !supportsMetaMask;

    // Initialize the Web3Provider when the page loads
    useEffect(() => {
        if (!supportsMetaMask || needsMetaMask) {
            setInitialized(true);
            return;
        }

        const ethereum = getEthereum();

        const initProvider = async (): Promise<void> => {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");

            const [chain, accounts] = await Promise.all([provider.getNetwork(), provider.listAccounts()]);

            const account = accounts.length > 0 ? utils.getAddress(accounts[0]) : undefined;
            const chainId = chain.chainId;

            setAccount(account);

            setChainId(chainId);

            setEthereumProvider(provider);

            // In case the user was connected prior, this will be available
            console.log("connected prior with:", account);

            setInitialized(true);
        };

        void initProvider();

        const accountChangedListener = (accounts: string[]): void => {
            setAccount(accounts.length > 0 ? utils.getAddress(accounts[0]) : undefined);
        };

        const chainChangedListener = (chainId: string): void => {
            // Chain ID came in as a hex string, so we need to convert it to decimal
            setChainId(Number.parseInt(chainId, 16));
        };
        const connectListener = ({ chainId }: { chainId: string }): void => {
            chainChangedListener(chainId);
        };

        const disconnectListener = (): void => {
            setChainId(undefined);
        };

        ethereum.on("accountsChanged", accountChangedListener);

        ethereum.on("chainChanged", chainChangedListener);

        ethereum.on("disconnect", disconnectListener);

        // Connect event is fired when the user is disconnected because an error
        // (e.g. the network is invalid) and then switches to a valid network
        ethereum.on("connect", connectListener);

        return () => {
            ethereum.removeListener("accountsChanged", accountChangedListener);
            ethereum.removeListener("chainChanged", chainChangedListener);
            ethereum.removeListener("connect", connectListener);
            ethereum.removeListener("disconnect", disconnectListener);
        };
    }, []);

    const requestAccount = useCallback(async () => {
        try {
            if (ethereumProvider === undefined) {
                throw new Error("Ethereum provider is not set");
            }

            // At this point we know for sure that the `ethereumProvider` is set
            const [accounts] = (await Promise.all([ethereumProvider.send("eth_requestAccounts", [])])) as [string[]];

            return {
                account: accounts.length > 0 ? accounts[0] : undefined,
            };
        } catch {
            return {
                account: undefined,
            };
        }
    }, [ethereumProvider]);

    const onError = useCallback((error: ErrorType, errorMessage?: string) => {
        setErrorMessage(errorMessage ?? ErrorTypes[error]);

        setConnecting(false);
    }, []);

    const connectWallet = useCallback(
        async (message: string) => {
            setConnecting(true);

            setErrorMessage(undefined);

            const { account } = await requestAccount();

            if (account === undefined) {
                onError(ErrorType.NoAccount);
                return;
            }

            const address = utils.getAddress(account);
            const signature = await ethereumProvider?.getSigner().signMessage(message);

            router.visit(route("connect"), {
                replace: true,
                method: "post" as VisitOptions["method"],
                data: {
                    address,
                    signature,
                },
                onError: (error) => {
                    const firstError = [error.address, error.chainId].find((value) => typeof value === "string");

                    onError(ErrorType.Generic, firstError);
                },
                onFinish: () => {
                    setAccount(account);

                    setChainId(chainId);

                    setConnecting(false);
                },
            });
        },
        [requestAccount, router],
    );

    const allowedChainId = (): boolean => {
        if (!allowedNetworks.includes(chainId as never)) {
            onError(ErrorType.InvalidNetwork, "Only Ethereum and Polygon networks are supported.");
            return false
        }

        return true;
    };

    const scanUrl = (): string => {
        if (chainId === 137) {
            return "https://polygonscan.com/address/";
        }

        return "https://etherscan.io/address/";
    }

    return {
        account,
        chainId,
        allowedChainId,
        scanUrl,
        connectWallet,
        connecting,
        initialized,
        needsMetaMask,
        supportsMetaMask,
        errorMessage,
    };
};

export default useMetaMask;
