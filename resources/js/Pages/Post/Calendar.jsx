import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from "react";
import Posts from '@/Components/Posts';

export default function Calendar({ auth, posts, pastPosts, groupId, schoolId, groups }) {
    
    const [ groupFilter, setGroupFilter ] = useState(true);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Naptár 📅</h2>
                <p>Te is mindig elfelejted az iskolai rendezvények időpontját, fontos dátumokat?</p>
                <p>Ezen az oldalon minden fontos eseményt elmenthetsz így nem maradsz le róluk és az osztálytársaid is láthatják, hogy mire számíthatnak a következő napokban</p>
                <div className='text-right mt-3 flex justify-between'>
                    <div className='space-x-3 space-x-3'>
                        <button
                            onClick={() => {setGroupFilter(true)}}
                            disabled={ groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == true) ? `text-black border-2 border-black bg-teal-400 ` : `bg-teal-500 hover:bg-teal-600 text-white`)}
                        >
                            Osztály
                        </button>
                        <button
                            onClick={() => {setGroupFilter(false)}}
                            disabled={ !groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == false) ? `text-black border-2 border-black bg-teal-400 ` : `bg-teal-500 hover:bg-teal-600 text-white`)}
                        >
                            Iskola                            
                        </button>
                    </div>
                    <div className='mt-5'>
                        <Link
                            href={route('posts.create', 'calendar')}
                            className='px-4 py-2 mt-4 text-white bg-teal-500 rounded-md hover:bg-teal-600'
                        >
                            Új esemény
                        </Link>
                    </div>
                </div>
            </div>}
        >
            <Head title="Calendar" />

            <div className="py-12 bg-teal-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Posts user={auth.user} posts={posts} pastPosts={pastPosts} topic="calendar" groupId={groupId} schoolId={schoolId} groupFilter={groupFilter} groups={groups} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
