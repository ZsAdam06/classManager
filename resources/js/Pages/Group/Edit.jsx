import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, group }) {
    const { data, setData, put, processing, errors } = useForm({
        name: group.name || "",
        school_id: group.school_id || "",
    });

    const color = 'blue';

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('groups.update', group.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Szerkesztés</h2>}
        >
            <Head title="Edit" />

            <div className={`py-12 bg-${color}-900`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col space-y-8 text-left'>
                                <h1 className='mx-auto text-xl'>Osztály szerkesztése</h1>
                                <label>
                                    Név
                                    <textarea 
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset'
                                    />
                                    <p>{errors.name && <span className='text-red-500'>A név megadása kötelező</span>}</p>
                                </label>
                            </div>
                            <div className='flex'>
                                <Link
                                    href={route("schools.index")}
                                    className='inline-block px-4 py-2 mt-4 text-black border rounded-md hover:bg-gray-200'
                                >
                                    Mégse
                                </Link>
                                <button
                                    type='submit'
                                    disabled={processing}
                                    className={`px-4 py-2 mt-4 ml-4 text-white bg-${color}-900 rounded-md hover:bg-${color}-950`}
                                >
                                    Létrehozás
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
