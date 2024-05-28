import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from "react";
import Posts from '@/Components/Posts';

export default function Parent({ auth, posts, groupId, schoolId, groups }) {
    
    const [ groupFilter, setGroupFilter ] = useState(true);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Szülői munkaközösség 🚸</h2>
                <p>Kedves Szülők!</p>
                <p>Ezen az oldalon kifejthetnek bármilyen témát a gyerekükkel és az iskolával kapcsolatban, amit a többi szülővel közösen meg tudnak beszélni.</p>
                <div className='text-right mt-3 flex justify-between'>
                    <div className='space-x-3 space-x-3'>
                        <button
                            onClick={() => {setGroupFilter(true)}}
                            disabled={ groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == true) ? `text-black border-2 border-black bg-orange-400 ` : `bg-orange-500 hover:bg-orange-600 text-white`)}
                        >
                            Osztály
                        </button>
                        <button
                            onClick={() => {setGroupFilter(false)}}
                            disabled={ !groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == false) ? `text-black border-2 border-black bg-orange-400 ` : `bg-orange-500 hover:bg-orange-600 text-white`)}
                        >
                            Iskola                            
                        </button>
                    </div>
                    <div className='mt-5'>
                        <Link
                            href={route('posts.create', 'parent')}
                            className='px-4 py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600'
                        >
                            Új téma hozzáadása
                        </Link>
                    </div>
                </div>
            </div>}
        >
            <Head title="Parent" />

            <div className="py-12 bg-orange-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Posts user={auth.user} posts={posts} topic="parent" groupId={groupId} schoolId={schoolId} groupFilter={groupFilter} groups={groups}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
