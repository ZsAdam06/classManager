import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from "react";

export default function Index({ auth, schools, groups, users }) {
    function groupNumber(id){
        let count = 0;
        groups.forEach(group => {
            if(group.school_id == id){
                count++;
            }            
        });
        return count;
    }

    function userNumber(id){
        let count = 0;
        users.forEach(user => {
            if(user.group_id == id){
                count++;
            }            
        });
        return count;
    }
    
    function deleteSchool(id) {
        router.delete(route('schools.destroy', id));
    }

    function deleteGroup(id) {
        router.delete(route('groups.destroy', id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div><h2 className="font-semibold text-xl text-gray-800 leading-tight">Iskolák és osztályok</h2>
                <p>Itt tudod megnézni a már regisztrált iskolákat és osztályaikat, szerkeszteni a nevüket továbbá újakat is tudsz hozzáadni, de törlésre csak akkor van lehetőség, iskolák esetében ha nincs hozzá csatolva osztály, osztályok esetében pedig csak akkor van erre lehetőség ha nincs hozzárendelve felhasználó az adott osztályhoz</p>
                <div className='text-right mt-3 text-right'>
                    <div className='mt-5'>
                        <Link
                            href={route('schools.create')}
                            className='px-4 py-2 mt-4 text-white bg-blue-900 rounded-md hover:bg-blue-950'
                        >
                            Új iskola hozzáadása
                        </Link>
                    </div>
                </div>
            </div>}
        >
            <Head title="Admin" />

            <div className="py-12 bg-blue-900">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {schools && schools
                            .map((school) => (
                                <div
                                    key={school.id}
                                    className="p-5 my-5 text-left border rounded-md shadow-sm"
                                >
                                    <div className='flex justify-between'>
                                        <h1>{school.name}</h1>
                                        <div className='space-x-2 space-y-2'>
                                            <Link
                                                href={route('schools.edit', school.id)}
                                                className='px-2 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-950'
                                            >
                                                Szerkesztés
                                            </Link>
                                            {groupNumber(school.id) == 0 && <Link
                                                onClick={() => {
                                                    if(confirm("Biztosan törölni szeretnéd ezt az iskolát?")){
                                                        deleteSchool(school.id);
                                                    }
                                                }}
                                                className="px-2 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500"
                                            >
                                                Törlés
                                            </Link>}
                                        </div>
                                    </div>
                                    <ul className='mt-2 ml-2 mb-4'>
                                        {school.groups && school.groups.map((group) => (
                                            <li
                                                key={group.id}
                                                className="p-2 my-2 text-left flex space-x-3"
                                            >
                                                <h2>{group.name}</h2>
                                                <div className='space-x-2 space-y-2'>
                                                    <Link
                                                        href={route('groups.show', group.id)}
                                                        className='px-2 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-950'
                                                    >
                                                        Névsor
                                                    </Link>
                                                    <Link
                                                        href={route('groups.edit', group.id)}
                                                        className='px-2 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-950'
                                                    >
                                                        ✏
                                                    </Link>
                                                    {userNumber(group.id) == 0 && <Link
                                                        onClick={() => {
                                                            if(confirm("Biztosan törölni szeretnéd ezt az osztályt?")){
                                                                deleteGroup(group.id);
                                                            }
                                                        }}
                                                        className="px-2 py-2 text-white bg-red-400 rounded-md hover:bg-red-500"
                                                    >
                                                        ❌
                                                    </Link>}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='text-center'>
                                        <Link
                                            href={route('groups.create', school.id)}
                                            className='px-2 py-2 text-white bg-green-500 rounded-md hover:bg-green-600'
                                        >
                                            Osztály hozzáadása
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
