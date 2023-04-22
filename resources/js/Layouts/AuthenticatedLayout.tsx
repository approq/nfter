import type { Method } from "@inertiajs/core";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { convertAddress } from "@/Helpers/utils";

interface Properties {
    user: App.Data.UserData;
    children: React.ReactNode;
}

export default function Authenticated({ user, children }: Properties): JSX.Element {
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
                        <Dropdown.Link>
                            <div className={"flex"}>
                                <img
                                    className={"mr-3 h-4 w-4"}
                                    src="/images/external.svg"
                                    alt="external"
                                />
                                View on Explorer
                            </div>
                        </Dropdown.Link>

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
        </div>
    );
}
