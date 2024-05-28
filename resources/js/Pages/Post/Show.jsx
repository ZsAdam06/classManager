import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import ShowPost from '@/Components/ShowPost';

export default function Show({ auth, post, author, comments, fileUrl, commentUrls }) {
    
    function selectColor(topic) {
        return topic === 'learn' ? 'blue' : (topic === 'help' ? 'red' : (topic === 'event' ? 'green' : (topic === 'parent' ? 'orange' : ( topic === 'calendar' ? 'teal' : 'purple'))));
    }
    let color = selectColor(post.topic);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bejegyzés</h2>}
        >
            <Head title="Post" />

            <div className={`py-12 bg-${color}-500`}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ShowPost user={auth.user} post={post} author={author} comments={comments} fileUrl={fileUrl} commentUrls={commentUrls}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
