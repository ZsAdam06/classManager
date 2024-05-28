import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Create({ auth, topic }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        file: "",
        date: format(new Date(), 'yyyy-MM-dd'),
        subject: "m",
        visibility: "school",
        topic: topic,
        user_id: auth.user.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'));
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
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='flex flex-col space-y-8 text-left'>
                                <h1 className='mx-auto text-xl'>Új bejegyzés létrehozása</h1>
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
                                {topic === 'calendar' && <label>
                                    Dátum
                                    <input 
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                        required
                                    />
                                    <p>{errors.date && <span className='text-red-500'>A dátum megadása kötelező</span>}</p>
                                </label>}
                                {topic === 'learn' && <label>
                                    <p>Témakör:</p>
                                    <select id="subject" value={data.subject} onChange={(e) => setData("subject", e.target.value)}
                                        className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                                    >
                                        <option value="m">Matek</option>
                                        <option value="g">Magyar</option>
                                        <option value="h">Történelem</option>
                                        <option value="l">Idegen nyelv</option>
                                        <option value="s">Természettudomány</option>
                                        <option value="o">Egyéb</option>
                                    </select>
                                </label>}
                                {topic !== 'learn' && <label>
                                    <p>Kik láthatják a bejegyzést?</p>
                                    <select id="visibility" value={data.visibility} onChange={(e) => setData("visibility", e.target.value)}
                                        className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                                    >
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
                                <input 
                                    type="file"
                                    onChange={(e) => setData("file", e.target.files[0])}
                                    className={`block w-full rounded-md border-0 p-1.5 text-${color}-900 shadow-sm ring-1 ring-inset`}
                                />
                                <p>{errors.file && <span className='text-red-500'>Nem megfelelő fájl formátum vagy túl nagy fájlméret</span>}</p>

                            </div>
                            <div className='flex'>
                                <Link
                                    href={route(`posts.${topic}`)}
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
