import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from "react";
import Posts from '@/Components/Posts';

export default function Help({ auth, posts, groupId, schoolId, groups }) {
    
    const [ groupFilter, setGroupFilter ] = useState(true);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Segítség 🙏</h2>
                <p>Kérj segítséget az osztálytársaidtól vagy iskolatársaidtól, hogy könnyebben menjen a tanulás vagy akár elkérheted az órai munkát is ha éppen hiányoztál az adott órán</p>
                <div className='text-right mt-3 flex justify-between'>
                    <div className='space-x-3 space-x-3'>
                        <button
                            onClick={() => {setGroupFilter(true)}}
                            disabled={ groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == true) ? `text-black border-2 border-black bg-red-400 ` : `bg-red-500 hover:bg-red-600 text-white`)}
                        >
                            Osztály
                        </button>
                        <button
                            onClick={() => {setGroupFilter(false)}}
                            disabled={ !groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == false) ? `text-black border-2 border-black bg-red-400 ` : `bg-red-500 hover:bg-red-600 text-white`)}
                        >
                            Iskola                            
                        </button>
                    </div>
                    <div className='mt-5'>
                        <Link
                            href={route('posts.create', 'help')}
                            className='px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600'
                        >
                            Segítséget kérek
                        </Link>
                    </div>
                </div>
            </div>}
        >
            <Head title="Help" />

            <div className="py-12 bg-red-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Posts user={auth.user} posts={posts} topic="help" groupId={groupId} schoolId={schoolId} groupFilter={groupFilter} groups={groups} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
