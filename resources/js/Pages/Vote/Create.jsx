import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        ans: "",
        deadline: "",
        visibility: "",
        is_finished: false,
        author_id: auth.user.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('votes.store'));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Új létrehozása</h2>}
        >
            <Head title="Create" />

            <div className="py-12 bg-purple-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='flex flex-col space-y-8 text-left'>
                                <h1 className='mx-auto text-xl'>Új szavazás létrehozása</h1>
                                <label>
                                    Kérdés
                                    <textarea 
                                        value={data.question}
                                        onChange={(e) => setData("question", e.target.value)}
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset'
                                    />
                                    <p>{errors.question && <span className='text-red-500'>A kérdés megadása kötelező</span>}</p>
                                </label>
                                <label>
                                    Válaszok - Minden válaszlehetőséget új sorba írj
                                    <textarea 
                                        value={data.ans}
                                        onChange={(e) => setData("ans", e.target.value)}
                                        className='block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset'
                                    />
                                    <p>{errors.ans && <span className='text-red-500'>A válaszok megadása kötelező</span>}</p>
                                </label>
                                <label>
                                    Határidő:
                                    <input
                                    type="datetime-local"
                                    id="deadline"
                                    name="deadline"
                                    value={data.deadline}
                                    className='ml-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                                    min={format(new Date(), 'yyyy-MM-dd HH:mm')}
                                    onChange={(e) => setData("deadline", e.target.value)}/>
                                    <p>{errors.deadline && <span className='text-red-500'>A határidő megadása kötelező</span>}</p>
                                </label>
                                <label>
                                    <p>Kik láthatják a szavazást?</p>
                                    <select id="visibility" value={data.visibility} onChange={(e) => setData("visibility", e.target.value)} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'>
                                        <option value="school">Az egész iskola</option>
                                        <option value="class">Csak az osztály</option>
                                    </select>
                                </label>
                            </div>
                            <div className='flex'>
                                <Link
                                    href={route("votes.index")}
                                    className='inline-block px-4 py-2 mt-4 text-black border rounded-md hover:bg-gray-200'
                                >
                                    Mégse
                                </Link>
                                <button
                                    type='submit'
                                    disabled={processing}
                                    className='px-4 py-2 mt-4 ml-4 text-white bg-purple-500 rounded-md hover:bg-purple-600'
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
