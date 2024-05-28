import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, comment, commentUrl, topic }) {
    const [newFile, setNewFile] = useState(commentUrl == "");

    const { data, setData, post, processing, errors } = useForm({
        description: comment.description || "",
        file: null,
        user_id: auth.user.id,
        post_id: comment.post_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.update', comment.id));
    }
    function handleDelete () {
        setNewFile(true);
    }

    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(topic);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Szerkesztés</h2>}
        >
            <Head title="Update" />

            <div className={`py-12 bg-${color}-500`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='flex flex-col space-y-8 text-left'>
                                <h1 className='mx-auto text-xl'>Komment szerkesztése</h1>
                                <label>
                                    Leírás
                                    <textarea 
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.description && <span className='text-red-500'>A leírás megadása kötelező</span>}</p>
                                </label>
                                {comment.filename && !newFile && <div>
                                    Csatolt fájl:
                                    <p>{comment.filename}</p>
                                    <div className='flex space-x-3'>
                                        <a 
                                            href={commentUrl}
                                            className={`px-4 py-2 mt-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                                        > 
                                            Megtekint
                                        </a>
                                        <a  
                                            href='#'
                                            onClick={handleDelete}
                                            className={`px-4 py-2 mt-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                                        > 
                                            Fájl cseréje
                                        </a>
                                    </div>
                                </div>}
                                {(newFile || !(comment.filename)) && <div>
                                    <input 
                                        type="file"
                                        onChange={(e) => setData("file", e.target.files[0])}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.file && <span className='text-red-500'>Nem megfelelő fájl formátum vagy túl nagy fájlméret</span>}</p>
                                </div>}
                            </div>
                            <div className='flex'>
                                <Link
                                    href={route("posts.show", comment.post_id)}
                                    className='inline-block px-4 py-2 mt-4 text-black border rounded-md hover:bg-gray-200'
                                >
                                    Mégse
                                </Link>
                                <button
                                    type='submit'
                                    disabled={processing}
                                    className={`px-4 py-2 mt-4 ml-4 text-white bg-${color}-500 rounded-md hover:bg-${color}-600`}
                                >
                                    Mentés
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
