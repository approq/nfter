import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Properties {
    auth: { user: App.Data.UserData };
    errors: any;
}

export default function Dashboard(properties: Properties): JSX.Element {
    return (
        <AuthenticatedLayout
            auth={properties.auth}
            /* eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment */
            error={properties.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You&apos;re logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
