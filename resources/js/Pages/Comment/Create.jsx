import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, postId, postDescription, topic }) {
    const { data, setData, post, processing, errors } = useForm({
        description: "",
        file: "",
        user_id: auth.user.id,
        post_id: postId
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store'));
    }

    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(topic);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Új létrehozása</h2>}
        >
            <Head title="Create" />

            <div className={`py-12 bg-${color}-500`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>Bejegyzés: {postDescription}</div>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='flex flex-col space-y-8 text-left'>
                                <h1 className='mx-auto text-xl'>Új komment írása</h1>
                                <label>
                                    Hozzászólás
                                    <textarea 
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.description && <span className='text-red-500'>A leírás megadása kötelező</span>}</p>
                                </label>
                                <input 
                                    type="file"
                                    onChange={(e) => setData("file", e.target.files[0])}
                                    className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                />
                                <p>{errors.file && <span className='text-red-500'>Nem megfelelő fájl formátum vagy túl nagy fájlméret</span>}</p>
                            </div>
                            <div className='flex'>
                                <Link
                                    href={route("posts.show", postId)}
                                    className='inline-block px-4 py-2 mt-4 text-black border rounded-md hover:bg-gray-200'
                                >
                                    Mégse
                                </Link>
                                <button
                                    type='submit'
                                    disabled={processing}
                                    className={`px-4 py-2 mt-4 ml-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
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
