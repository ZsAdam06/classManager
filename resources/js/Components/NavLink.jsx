import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-white text-grey-300 focus:border-white '
                    : 'border-transparent text-grey-100 hover:text-gray-200 hover:border-gray-300 focus:text-gray-200 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
