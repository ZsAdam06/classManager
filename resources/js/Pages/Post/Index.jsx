import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from "react";

export default function Index({ auth, posts }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setData(posts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Index</h2>}
        >
            <Head title="Index" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>{data.map((post) => {return <div className="p-3 text-gray-900">{post.title}, {post.topic}</div>})}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
