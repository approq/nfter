import { Method } from "@inertiajs/core";
import { type CID, create, type IPFSHTTPClient } from "ipfs-http-client";
import { useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { useMetaMaskContext } from "@/Contexts/MetaMaskContext";
import { convertAddress } from "@/Helpers/utils";

interface Properties {
    user: App.Data.UserData;
    children: React.ReactNode;
}

export default function Authenticated({ user, children }: Properties): JSX.Element {
    const { scanUrl } = useMetaMaskContext();
    const [images, setImages] = useState<{ cid: CID; path: string }[]>([]);

    let ipfs: IPFSHTTPClient | undefined;
    try {
        ipfs = create({});
    } catch (error) {
        console.error("IPFS error ", error);
    }


    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const files = (form[0] as HTMLInputElement).files;

        if (files == null || files.length === 0) {
            alert("No files selected");
            return;
        }

        const file = files[0];
        const result = await (ipfs as IPFSHTTPClient).add(file);

        console.log(result.cid)
        setImages([
            ...images,
            {
                cid: result.cid,
                path: result.path,
            },
        ]);

        form.reset();
    };

    return (
        <div className={"flex min-h-screen flex-col"}>
            <header className={"relative flex justify-between border-b border-b-secondary-300 px-6 py-4 md:px-8"}>
                <ApplicationLogo className={"text-2xl font-bold"} />

                <Dropdown>
                    <Dropdown.Trigger>
                        <div
                            className={`flex cursor-pointer items-center rounded-lg border-secondary-400 px-3 py-1.5
                            text-sm font-semibold text-secondary-700 hover:flex hover:items-center
                             hover:border-primary-400 hover:bg-primary-50 md:border-2 md:py-2.5`}
                        >
                            <div className={"h-5 w-5 overflow-hidden rounded-full"}>
                                <Jazzicon
                                    diameter={20}
                                    seed={jsNumberForAddress(user.address)}
                                />
                            </div>

                            <div className={"ml-2"}>{convertAddress(user.address)}</div>

                            <div className={"ml-3 inline-block border-l border-l-secondary-300 pl-3.5"}>
                                <img
                                    src="/images/chevron.svg"
                                    alt="chevron"
                                    className={"w-3"}
                                />
                            </div>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        contentClasses={"rounded-xl py-4 -mt-2 bg-white text-secondary-600 font-semibold space-y-2"}
                    >
                        <a
                            href={scanUrl() + user.address}
                            target={"_blank"}
                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-secondary-900 focus:bg-gray-100 focus:outline-none" rel="noreferrer"
                        >
                            <div className={"flex"}>
                                <img
                                    className={"mr-3 h-4 w-4"}
                                    src="/images/external.svg"
                                    alt="external"
                                />
                                View on Explorer
                            </div>
                        </a>

                        <Dropdown.Link
                            method={Method.POST}
                            as={"button"}
                            href={route("disconnect")}
                        >
                            <div className={"flex"}>
                                <img
                                    className={"mr-3 h-4 w-4"}
                                    src="/images/exit.svg"
                                    alt="exit"
                                />
                                Disconnect Wallet
                            </div>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </header>

            <div className={"flex grow flex-col py-7"}>
                <div className={"container"}>{children}</div>
            </div>

            {!ipfs && (
                <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
            )}

            {(ipfs != null) && (
                <>
                    <p>Upload File using IPFS</p>

                    <form onSubmit={onSubmitHandler}>
                        <input name="file" type="file" />

                        <button type="submit">Upload File</button>
                    </form>

                    <div>
                        {images.map((image, index) => (
                            <div key={image.cid.toString() + index}>
                                <img
                                    alt={`Uploaded #${index + 1}`}
                                    src={"https://ipfs.io/ipfs/" + image.path}
                                    style={{ maxWidth: "400px", margin: "15px" }}
                                />

                                <a
                                    href={"https://ipfs.io/ipfs/" + image.path}
                                    download
                                >
                                    aaa
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
