import ziggyRoute from "ziggy-js";
import { AxiosInstance } from "axios";
import { Ethereum } from "@/hooks/useMetaMask.contracts";

declare global {
    const route: typeof ziggyRoute;

    interface Window {
        axios: AxiosInstance;
        ethereum?: Ethereum;
        IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
}

export {};
