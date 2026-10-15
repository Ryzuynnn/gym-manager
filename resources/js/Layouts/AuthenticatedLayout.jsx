import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    const linkClass = (active) =>
        `rounded-md px-3 py-2 text-sm font-medium transition ${
            active ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`;

    return (
        <div className="min-h-screen bg-slate-100">
            <nav className="bg-slate-900 shadow-lg">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href={route('dashboard')} className="text-lg font-extrabold tracking-wide text-white">
                            🏋️ GYM<span className="text-orange-500">MANAGER</span>
                        </Link>

                        <div className="hidden items-center gap-2 sm:flex">
                            <Link href={route('dashboard')} className={linkClass(route().current('dashboard'))}>
                                Dashboard
                            </Link>
                            <Link href={route('members.index')} className={linkClass(route().current('members.*'))}>
                                Members
                            </Link>
                        </div>
                    </div>

                    <div className="hidden items-center gap-4 sm:flex">
                        <Link href={route('profile.edit')} className="text-sm text-slate-300 hover:text-white">
                            {user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                        >
                            Log Out
                        </Link>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 text-xl text-slate-300 hover:bg-slate-800 sm:hidden"
                        aria-label="Menu"
                    >
                        ☰
                    </button>
                </div>

                {open && (
                    <div className="space-y-1 border-t border-slate-700 px-4 py-3 sm:hidden">
                        <Link href={route('dashboard')} className={`block ${linkClass(route().current('dashboard'))}`}>
                            Dashboard
                        </Link>
                        <Link href={route('members.index')} className={`block ${linkClass(route().current('members.*'))}`}>
                            Members
                        </Link>
                        <Link href={route('profile.edit')} className="block px-3 py-2 text-sm text-slate-300">
                            Profile ({user.name})
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="block w-full px-3 py-2 text-left text-sm text-slate-300"
                        >
                            Log Out
                        </Link>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}