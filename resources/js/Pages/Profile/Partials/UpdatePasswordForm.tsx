import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { type FormEvent, useRef } from "react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

interface Properties {
    className?: string;
}

export default function UpdatePasswordForm({ className }: Properties): JSX.Element {
    const passwordInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const currentPasswordInput = useRef() as React.MutableRefObject<HTMLInputElement>;

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                if (errors.password != null) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password != null) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form
                onSubmit={updatePassword}
                className="mt-6 space-y-6"
            >
                <div>
                    <InputLabel
                        forInput="current_password"
                        value="Current Password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        handleChange={(event) => {
                            setData("current_password", event.target.value);
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        forInput="password"
                        value="New Password"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        handleChange={(event) => {
                            setData("password", event.target.value);
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={(event) => {
                            setData("password_confirmation", event.target.value);
                        }}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

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
