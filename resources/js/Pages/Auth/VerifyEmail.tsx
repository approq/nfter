import { Method } from "@inertiajs/core";
import { Head, Link, useForm } from "@inertiajs/react";

import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";

interface Properties {
    status: string;
}

export default function VerifyEmail({ status }: Properties): JSX.Element {
    const { post, processing } = useForm({});

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn&apos;t receive the email, we will gladly send you another.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton processing={processing}>Resend Verification Email</PrimaryButton>

                    <Link
                        href={route("logout")}
                        method={Method.POST}
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
