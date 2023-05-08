import { Listbox, Switch, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Fragment, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { useMetaMaskContext } from "@/Contexts/MetaMaskContext";
import { convertAddress } from "@/Helpers/utils";

interface Properties {
    user: App.Data.UserData;
    children: React.ReactNode;
    currencies: App.Data.CurrencyData[];
}

export default function Authenticated({ user, children, currencies }: Properties): JSX.Element {
    const { scanUrl } = useMetaMaskContext();
    const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") ?? "light");
    const [selectedCurrency, setSelectedCurrency] = useState(user.currency);

    const changeMode = (): void => {
        const mode = themeMode === "light" ? "dark" : "light";
        setThemeMode(mode);
        localStorage.setItem("themeMode", mode);
    };

    const changeCurrency = (currency: App.Data.CurrencyData): void => {
        void axios.post("/account/me", { currency_id: currency.id });
        setSelectedCurrency(currency);
    };

    return (
        <div className={`flex min-h-screen flex-col ${themeMode}`}>
            <header
                className={
                    "relative flex items-center justify-between border-b border-b-secondary-300 px-6 py-4 dark:bg-gray-700 md:px-8"
                }
            >
                <ApplicationLogo className={"text-2xl font-bold"} />

                <div className={"flex space-x-1"}>
                    <Switch
                        checked={themeMode === "dark"}
                        onChange={changeMode}
                        className={`${
                            themeMode === "dark" ? "bg-primary-500" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span
                            className={`${
                                themeMode === "dark" ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>

                    <div className={"dark:text-white"}>Dark mode</div>
                </div>

                <Dropdown>
                    <Dropdown.Trigger>
                        <div
                            className={`flex cursor-pointer items-center rounded-lg border-secondary-400 px-3 py-1.5
                            text-sm font-semibold text-secondary-700 hover:flex hover:items-center
                             hover:border-primary-400 hover:bg-primary-50 dark:text-white dark:hover:bg-primary-400 md:border-2 md:py-2.5`}
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
                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-secondary-900 focus:bg-gray-100 focus:outline-none"
                            rel="noreferrer"
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
                            method={"post"}
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

            <div className={"flex grow flex-col py-7 dark:bg-slate-700 dark:text-white"}>
                <div className={"container"}>{children}</div>
            </div>

            <footer className="top-[100vh] flex justify-center border-t border-t-secondary-300 px-6 py-4 dark:bg-gray-700 md:px-8">
                <div className={"w-40"}>
                    <Listbox
                        value={selectedCurrency}
                        onChange={changeCurrency}
                        horizontal
                    >
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selectedCurrency.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute bottom-full my-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {currencies.map((currency) => (
                                        <Listbox.Option
                                            key={currency.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                                }`
                                            }
                                            value={currency}
                                        >
                                            {({ selected }) => (
                                                <span
                                                    className={`block truncate ${
                                                        selected ? "font-medium" : "font-normal"
                                                    }`}
                                                >
                                                    {currency.name}
                                                </span>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </footer>
        </div>
    );
}
