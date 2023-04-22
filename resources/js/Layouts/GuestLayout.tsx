import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

interface Properties {
    children: React.ReactNode;
    loading: boolean;
    connect: () => void;
}
export default function Guest({ children, loading, connect }: Properties): JSX.Element {
    return (
        <div className={"flex min-h-screen flex-col"}>
            <header className={"flex justify-between border-b border-b-secondary-300 px-6 py-4 md:px-8"}>
                <ApplicationLogo className={"text-2xl font-bold"} />

                <PrimaryButton
                    type={"button"}
                    onClick={connect}
                    processing={loading}
                >
                    Connect
                </PrimaryButton>
            </header>

            <div className={"flex grow flex-col py-7"}>
                <div className="container my-auto flex justify-center align-middle">{children}</div>
            </div>
        </div>
    );
}
