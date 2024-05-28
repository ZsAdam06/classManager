import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                Köszönjük a regisztrációt! Mielőtt elkezdenél, tudnád ellenőrizni az e-mail címedet azzal, hogy rákattintasz az általunk most küldött linkre? Ha nem kaptad meg az e-mailt, szívesen küldünk neked egy másikat.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Az általad regisztrációkor megadott e-mail címre elküldtük az új ellenőrző linket.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>Ellenőrző e-mail újraküldése</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Kijelentkezés
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
