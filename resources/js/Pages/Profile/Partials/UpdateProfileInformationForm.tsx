import { Transition } from "@headlessui/react";
import { Method } from "@inertiajs/core";
import { Link, useForm, usePage } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

interface Properties {
    mustVerifyEmail: boolean;
    status: string;
    className: string;
}

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }: Properties): JSX.Element {
    /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
    // @ts-ignore
    const user: App.Data.UserData = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (event: React.FormEvent): void => {
        event.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account&apos;s profile information and email address.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
            >
                <div>
                    <InputLabel
                        forInput="name"
                        value="Name"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(event) => {
                            setData("name", event.target.value);
                        }}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.name}
                    />
                </div>

                <div>
                    <InputLabel
                        forInput="email"
                        value="Email"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(event) => {
                            setData("email", event.target.value);
                        }}
                        required
                        autoComplete="email"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.email}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method={Method.POST}
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
