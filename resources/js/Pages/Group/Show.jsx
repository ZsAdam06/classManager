import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ auth, group, users }) {
    const color = 'blue';
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Osztálynévsor</h2>}
        >
            <Head title="Show" />

            <div className={`py-12 bg-${color}-900`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='mb-3'>
                            <Link
                                href={route('schools.index')}
                                className='px-2 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-950'
                            >
                                Vissza
                            </Link>
                        </div>
                        <div>
                            <h1 className='font-bold mb-2 mt-2'>Osztályfőnök</h1>
                            {users && users
                                .filter((user) => (user.role == 'teacher' || user.role == 'parent-teacher'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                )) == ""
                                ?
                                <h2 className='pl-2'>Nincsenek tanárok hozzárendelve az osztályhoz!</h2>
                                :
                                users
                                .filter((user) => (user.role == 'teacher' || user.role == 'parent-teacher'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                ))
                            }
                            <h1 className='font-bold mb-2 mt-2'>Diákok</h1>
                            {users && users
                                .filter((user) => (user.role == 'student'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                )) == ""
                                ?
                                <h2 className='pl-2'>Nincsenek diákok hozzárendelve az osztályhoz!</h2>
                                :
                                users
                                .filter((user) => (user.role == 'student'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                ))
                            }
                            <h1 className='font-bold mb-2 mt-2'>Szülők</h1>
                            {users && users
                                .filter((user) => (user.role == 'parent'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                )) == ""
                                ?
                                <h2 className='pl-2'>Nincsenek szülők hozzárendelve az osztályhoz!</h2>
                                :
                                users
                                .filter((user) => (user.role == 'parent'))
                                .map((user) => (
                                    <h2 className='pl-2' key={user.id}>{user.name}</h2>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
