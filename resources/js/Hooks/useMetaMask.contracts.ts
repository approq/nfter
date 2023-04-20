import { type MetaMaskInpageProvider } from "@metamask/providers";
import { type ethers } from "ethers";

interface EthereumEvent {
    connect: {
        chainId: string;
    };
    chainChanged: string;
    accountsChanged: string[];
}

type EventKeys = keyof EthereumEvent;

type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export type Ethereum = ethers.providers.ExternalProvider &
    MetaMaskInpageProvider & {
        on: <K extends EventKeys>(event: K, eventHandler: EventHandler<K>) => void;
    };

export interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}
