import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage().props;

    const features = [
        { icon: '👥', title: 'Member Management', text: 'Add, edit, and remove gym members in seconds.' },
        { icon: '📅', title: 'Membership Tracking', text: 'Monthly, Quarterly, or Yearly plans with expiry dates.' },
        { icon: '🔔', title: 'Expiry Alerts', text: 'See who is about to expire in the next 7 days.' },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white">
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                    <div className="text-xl font-extrabold tracking-wide">
                        🏋️ GYM<span className="text-orange-500">MANAGER</span>
                    </div>
                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold hover:bg-orange-400"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="px-4 py-2 text-sm font-semibold hover:text-orange-400">
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold hover:bg-orange-400"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12">
                    <h1 className="max-w-3xl text-5xl font-extrabold leading-tight sm:text-6xl">
                        Manage your gym <span className="text-orange-500">smarter</span>.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-slate-300">
                        Track members, memberships, and expiry dates in one simple dashboard.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href={auth.user ? route('dashboard') : route('register')}
                            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold shadow-lg hover:bg-orange-400"
                        >
                            {auth.user ? 'Go to Dashboard' : 'Get Started'}
                        </Link>
                        {!auth.user && (
                            <Link
                                href={route('login')}
                                className="rounded-lg border border-slate-500 px-6 py-3 font-semibold hover:bg-slate-800"
                            >
                                Log in
                            </Link>
                        )}
                    </div>

                    <div className="mt-16 grid gap-6 sm:grid-cols-3">
                        {features.map((f) => (
                            <div key={f.title} className="rounded-xl bg-white/10 p-6 backdrop-blur">
                                <div className="text-3xl">{f.icon}</div>
                                <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
                                <p className="mt-1 text-sm text-slate-300">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="py-6 text-center text-sm text-slate-400">Gym Manager</footer>
            </div>
        </>
    );
}