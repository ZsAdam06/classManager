import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from "react";
import ShowVote from '@/Components/ShowVote';

export default function Show({ auth, vote, author, answers, isVoted }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Szavazás</h2>}
        >
            <Head title="Vote" />

            <div className="py-12 bg-purple-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ShowVote user={auth.user} vote={vote} author={author} answers={answers} isVoted={isVoted} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
