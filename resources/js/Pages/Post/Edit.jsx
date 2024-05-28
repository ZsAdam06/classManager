import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { format } from 'date-fns';

export default function Edit({ auth, p, fileUrl }) {
    const [newFile, setNewFile] = useState(fileUrl == "");

    const { data, setData, post, processing, errors } = useForm({
        title: p.title || "",
        description: p.description || "",
        date: p.date || format(new Date(), 'yyyy-MM-dd'),
        subject: p.subject || "",
        visibility: p.visibility || "",
        file: null,
        filename: p.filename || "",
        filename_hash: p.filename_hash || "",
        topic: p.topic || "",
        user_id: auth.user.id,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.update', p.id));
    }

    function handleDelete () {
        setNewFile(true);
    }

    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(p.topic);

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
                                <h1 className='mx-auto text-xl'>Bejegyzés szerkesztése</h1>
                                <label>
                                    Cím
                                    <input 
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.title && <span className='text-red-500'>A cím megadása kötelező</span>}</p>
                                </label>
                                {p.topic === 'calendar' && <label>
                                    Dátum
                                    <input 
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.date && <span className='text-red-500'>A dátum megadása kötelező</span>}</p>
                                </label>}
                                {p.topic === 'learn' && <label>
                                    <p>Témakör:</p>
                                    <select id="subject" value={data.subject} defaultValue={p.subject} onChange={(e) => setData("subject", e.target.value)}>
                                        <option value="m">Matek</option>
                                        <option value="g">Magyar</option>
                                        <option value="h">Történelem</option>
                                        <option value="l">Idegen nyelv</option>
                                        <option value="s">Természettudomány</option>
                                        <option value="o">Egyéb</option>
                                    </select>
                                </label>}
                                {p.topic !== 'learn' && <label>
                                    <p>Kik láthatják a bejegyzést?</p>
                                    <select id="visibility" value={data.visibility} onChange={(e) => setData("visibility", e.target.value)}
                                        className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '>
                                        <option value="school">Az egész iskola</option>
                                        <option value="class">Csak az osztály</option>
                                    </select>
                                </label>}
                                <label>
                                    Leírás
                                    <textarea 
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.description && <span className='text-red-500'>A leírás megadása kötelező</span>}</p>
                                </label>
                                {p.filename && !newFile && <div>
                                    Csatolt fájl:
                                    <p>{p.filename}</p>
                                    <div className='flex space-x-3'>
                                        <a 
                                            href={fileUrl}
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
                                {newFile && <div>
                                    <input 
                                        type="file"
                                        onChange={(e) => setData("file", e.target.files[0])}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                    />
                                    <p>{errors.file && <span className='text-red-500'>Nem megfelelő fájl formátum vagy túl nagy fájlméret</span>}</p>
                                </div>
                                }
                            </div>
                            <div className='flex'>
                                <Link
                                    href={route(`posts.${p.topic}`)}
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
