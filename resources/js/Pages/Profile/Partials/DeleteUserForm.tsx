import { useForm } from "@inertiajs/react";
import { type FormEvent, useRef, useState } from "react";

import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

interface Properties {
    className: string;
}

export default function DeleteUserForm({ className }: Properties): JSX.Element {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef() as React.MutableRefObject<HTMLInputElement>;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = (): void => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: (): void => {
                closeModal();
            },
            onError: (): void => {
                passwordInput.current.focus();
            },
            onFinish: (): void => {
                reset();
            },
        });
    };

    const closeModal = (): void => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            <Modal
                show={confirmingUserDeletion}
                onClose={closeModal}
            >
                <form
                    onSubmit={deleteUser}
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">Are you sure you want to delete your account?</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            forInput="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={(event) => {
                                setData("password", event.target.value);
                            }}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeHolder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton
                            className="ml-3"
                            processing={processing}
                        >
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
