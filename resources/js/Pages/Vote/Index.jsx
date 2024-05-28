import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from "react";
import Votes from '@/Components/Votes';

export default function Index({ auth, votes, answers, groupId, schoolId, groups }) {
    
    const [ groupFilter, setGroupFilter ] = useState(true);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Szavazó oldal ☑</h2>
                <p>Ezen az oldalon anonim szavazásokat hozhatsz létre az osztályod számára, mely megkönnyíti a döntést sok fontos dologban</p>
                <div className='text-right mt-3 flex justify-between'>
                    <div className='space-x-3 space-x-3'>
                        <button
                            onClick={() => {setGroupFilter(true)}}
                            disabled={ groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == true) ? `text-black border-2 border-black bg-purple-400 ` : `bg-purple-500 hover:bg-purple-600 text-white`)}
                        >
                            Osztály
                        </button>
                        <button
                            onClick={() => {setGroupFilter(false)}}
                            disabled={ !groupFilter ? true : false }
                            className={`px-3 py-1 mt-4 rounded-md ` + ((groupFilter == false) ? `text-black border-2 border-black bg-purple-400 ` : `bg-purple-500 hover:bg-purple-600 text-white`)}
                        >
                            Iskola                            
                        </button>
                    </div>
                    <div className='mt-5'>
                        <Link
                            href={route('votes.create')}
                            className='px-4 py-2 mt-4 text-white bg-purple-500 rounded-md hover:bg-purple-600'
                        >
                            Új szavazás
                        </Link>
                    </div>
                </div>
            </div>}
        >
            <Head title="Learn" />

            <div className="py-12 bg-purple-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Votes user={auth.user} votes={votes} answers={answers} groupId={groupId} schoolId={schoolId} groupFilter={groupFilter} groups={groups}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
