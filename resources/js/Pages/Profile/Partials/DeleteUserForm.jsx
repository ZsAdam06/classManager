import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Fiók törlése</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Amint a fiókod törlésre kerül, minden erőforrását és adatát véglegesen töröljük. Mielőtt törölnéd a fiókodat, kérjük, töltsd le azokat az adatokat vagy információkat, amelyeket meg szeretnél őrizni.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Fiók törlése</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Biztosan törölni szeretnéd a fiókodat?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Amint a fiókod törlésre kerül, minden erőforrását és adatait véglegesen töröljük. Kérjük, írd be a jelszavadat azonosításhoz, hogy véglegesen törölni szeretnéd a fiókodat.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Jelszó" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Mégse</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Fiók törlése
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
