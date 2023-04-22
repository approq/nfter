import { Tooltip } from "@/Components/Tooltip";

interface Properties {
    nft: App.Data.NftData;
}

export default function Index({ nft }: Properties): JSX.Element {
    return (
        <div
            className={
                "rounded-xl border border-secondary-300 p-2 hover:border-primary-400 " +
                "outline outline-1 outline-transparent hover:outline-primary-400"
            }
        >
            <div className={"mb-3 overflow-hidden rounded-lg"}>
                <img
                    className={"w-full"}
                    src={nft.thumbnail}
                    alt={nft.title}
                />
            </div>

            <div className={"px-4 pb-4"}>
                <Tooltip content={nft.title}>
                    <h4 className={"mb-1 cursor-pointer truncate font-bold hover:text-primary-700"}>{nft.title}</h4>
                </Tooltip>

                <div className={"flex items-center"}>
                    {nft.collection_image != null && (
                        <img
                            className={"mr-2 h-5 w-5"}
                            src={nft.collection_image}
                            alt="user"
                        />
                    )}
                    <div className={"text-sm text-primary-700"}>
                        {nft.collection_website != null ? (
                            <a
                                href={nft.collection_website}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {nft.collection_name}
                            </a>
                        ) : (
                            <p className={"text-sm text-primary-700"}>{nft.collection_name}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
