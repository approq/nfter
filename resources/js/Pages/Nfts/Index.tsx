import NftCard from "@/Components/Cards/NftCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Properties {
    auth: { user: App.Data.UserData };
    nfts: App.Data.NftData[];
    currencies: App.Data.CurrencyData[];
}

export default function Index({ nfts, auth: { user }, currencies }: Properties): JSX.Element {
    return (
        <AuthenticatedLayout
            user={user}
            currencies={currencies}
        >
            {nfts.length > 0 ? (
                <div
                    className={
                        "-mx-1.5 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    }
                >
                    {nfts.map((nft, index) => (
                        <NftCard
                            nft={nft}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <div className={"text-center"}>
                    <img
                        className={"my-auto mb-2.5 inline w-10"}
                        src="/images/no-nft.svg"
                        alt="no-nft"
                    />
                    <p className={"text-sm font-semibold text-secondary-700"}>
                        Unfortunately your wallet does not own any NFTs.
                    </p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
