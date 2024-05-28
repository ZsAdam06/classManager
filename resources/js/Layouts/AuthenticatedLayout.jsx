import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    return (
        <div className="min-h-screen bg-blue-900">
            <nav className="text-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                </Link>
                            </div>

                            {user.role === 'student' && <div className="hidden space-x-8 sm:-my-px sm:ms-10 lg:flex">
                                <NavLink href={route('posts.learn')} active={route().current('posts.learn')}>
                                    Tananyagok
                                </NavLink>
                                <NavLink href={route('posts.help')} active={route().current('posts.help')}>
                                    Segítségkérés
                                </NavLink>
                                <NavLink href={route('posts.event')} active={route().current('posts.event')}>
                                    Programok
                                </NavLink>
                                <NavLink href={route('votes.index')} active={route().current('votes.index')}>
                                    Szavazás
                                </NavLink>
                                <NavLink href={route('posts.calendar')} active={route().current('posts.calendar')}>
                                    Események
                                </NavLink>
                            </div>}
                            {(user.role === 'parent-teacher' || user.role === 'parent' || user.role === 'teacher') && <div className="hidden space-x-8 sm:-my-px sm:ms-10 lg:flex">
                                <NavLink href={route('posts.parent')} active={route().current('posts.parent')}>
                                    Szülői oldal
                                </NavLink>
                                <NavLink href={route('posts.event')} active={route().current('posts.event')}>
                                    Programok
                                </NavLink>
                                <NavLink href={route('votes.index')} active={route().current('votes.index')}>
                                    Szavazás
                                </NavLink>
                                {(user.role === 'parent-teacher' || user.role === 'parent') && <NavLink href={route('posts.calendar')} active={route().current('posts.calendar')}>
                                    Események
                                </NavLink>}
                            </div>}
                            {user.role === 'admin' && <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('schools.index')} active={route().current('schools.index')}>
                                    Iskolák és osztályok
                                </NavLink>
                            </div>}
                        </div>

                        <div className="hidden lg:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-900 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Kijelentkezés
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-300 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' lg:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 text-white">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.name}</div>
                            <div className="font-medium text-sm text-white">{user.email}</div>
                        </div>

                        {user.role === 'student' && <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profil</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.learn')} active={route().current('posts.learn')}>
                                Tananyagok
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.help')} active={route().current('posts.help')}>
                                Segítségkérés
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.event')} active={route().current('posts.event')}>
                                Programok
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('votes.index')} active={route().current('votes.index')}>
                                Szavazás
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.calendar')} active={route().current('posts.calendar')}>
                                Események
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Kijelentkezés
                            </ResponsiveNavLink>
                        </div>}
                        {(user.role === 'parent-teacher' || user.role === 'parent' || user.role === 'teacher') && <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profil</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.parent')} active={route().current('posts.parent')}>
                                Szülői oldal
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('posts.event')} active={route().current('posts.event')}>
                                Programok
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('votes.index')} active={route().current('votes.index')}>
                                Szavazás
                            </ResponsiveNavLink>
                            {(user.role === 'parent-teacher' || user.role === 'parent') && <ResponsiveNavLink href={route('posts.calendar')} active={route().current('posts.calendar')}>
                                Események
                            </ResponsiveNavLink>}
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Kijelentkezés
                            </ResponsiveNavLink>
                        </div>}
                        {user.role === 'admin' && <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink href={route('schools.index')} active={route().current('schools.index')}>
                                Iskolák és osztályok
                            </NavLink>
                        </div>}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
