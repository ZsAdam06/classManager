import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register( props ) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: '',
        group_id: '',
        password: '',
        password_confirmation: '',
    });

    const [ schoolId, setSchoolId ] = useState();

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Név" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name ? "Adja meg a nevét" : ""} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email cím" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email ? "Adjon meg egy érvényes email címet!" : ""} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <label className='block font-medium text-sm text-gray-700'>
                        <p>Szerepkör</p>
                        <select id="role" value={data.role} onChange={(e) => setData('role', e.target.value)}
                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                        >
                            <option value="-">-</option>
                            <option value="student">Diák</option>
                            <option value="teacher">Tanár</option>
                            <option value="parent">Szülő</option>
                            <option value="parent-teacher">Szülő és tanár</option>
                        </select>
                    </label>
                    <InputError message={errors.role ? "Adja meg az osztályban betöltött szerepét!" : ""} className="mt-2" />
                </div>

                {props.schools && <div className='mt-4'>
                    <label className='block font-medium text-sm text-gray-700'>
                        <p>Iskola</p>
                        <select id="school" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} required
                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                        >
                            <option value='-'>-</option>
                            {props.schools && props.schools
                                .map((school) => (
                                    <option key={school.id} value={school.id}>{school.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <InputError message={errors.group_id ? "Az osztály megadása kötelező!" : ""} className="mt-2" />
                </div>}

                {schoolId && schoolId != '-' && <div className='mt-4'>
                    <label className='block font-medium text-sm text-gray-700'>
                        <p>Osztály</p>
                        <select id="group_id" value={data.group_id} onChange={(e) => setData('group_id', e.target.value)} required
                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                        >
                            <option >-</option>
                            {schoolId && props.groups && props.groups
                                .filter((group) => (schoolId ? schoolId == group.school_id : true))
                                .map((group) => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <InputError message={errors.group_id ? "Az osztály megadása kötelező!" : ""} className="mt-2" />
                </div>}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Jelszó" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password ? "Adjon meg érvényes jelszót!" : ""} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Jelszó mégegyszer" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation ? "Adjon meg érvényes jelszót!" : ""} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Már regisztráltál korábban?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Regisztrálás
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
