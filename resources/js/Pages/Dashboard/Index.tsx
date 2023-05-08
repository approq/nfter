import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Properties {
    auth: { user: App.Data.UserData };
    currencies: App.Data.CurrencyData[];
    balances: { eth: number; matic: number };
}

export default function Index({ balances, auth: { user }, currencies }: Properties): JSX.Element {
    return (
        <AuthenticatedLayout
            user={user}
            currencies={currencies}
        >
            <div className={"space-y-2 text-lg"}>
                <div>
                    <span className={"font-bold"}>ETH: </span> {balances.eth}
                </div>
                <div>
                    <span className={"font-bold"}>MATIC: </span> {balances.matic}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
