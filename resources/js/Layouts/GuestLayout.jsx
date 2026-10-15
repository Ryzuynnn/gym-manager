import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 px-4">
            <Link href="/" className="mb-6 text-3xl font-extrabold tracking-wide text-white">
                🏋️ GYM<span className="text-orange-500">MANAGER</span>
            </Link>

            <div className="w-full overflow-hidden rounded-xl bg-white px-6 py-6 shadow-2xl sm:max-w-md">
                {children}
            </div>
        </div>
    );
}