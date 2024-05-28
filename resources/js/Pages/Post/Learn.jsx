import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from "react";
import Posts from '@/Components/Posts';

export default function Learn({ auth, posts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Tananyagok 📕</h2>
                <p>Oszd meg a hasznos tananyagaidat, hogy segíts a többi diáknak országszerte</p>
                <div className='text-right m-3'>
                    <Link
                        href={route('posts.create', 'learn')}
                        className='px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
                    >
                        Új tananyag létrehozása
                    </Link>
                </div>
            </div>}
        >
            <Head title="Learn" />

            <div className="py-12 bg-blue-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Posts user={auth.user} posts={posts} topic="learn"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
