import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function Stat({ label, value, border }) {
    return (
        <div className={`rounded-xl border-l-4 bg-white p-5 shadow ${border}`}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">{value}</p>
        </div>
    );
}

export default function Index({ members, search }) {
    const [query, setQuery] = useState(search || '');

    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
    const isExpired = (m) => m.expiry_date < today;
    const daysLeft = (m) =>
        Math.round((new Date(m.expiry_date) - new Date(today)) / 86400000);

    const expiredCount = members.filter(isExpired).length;
    const activeCount = members.length - expiredCount;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('members.index'), { search: query }, { preserveState: true });
    };

    const handleDelete = (member) => {
        if (confirm(`Delete ${member.name}?`)) {
            router.delete(route('members.destroy', member.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-slate-900">Gym Members</h2>}
        >
            <Head title="Members" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Stat label="Total Members" value={members.length} border="border-slate-700" />
                        <Stat label="Active" value={activeCount} border="border-green-500" />
                        <Stat label="Expired" value={expiredCount} border="border-red-500" />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                            >
                                Search
                            </button>
                        </form>

                        <Link
                            href={route('members.create')}
                            className="rounded-lg bg-orange-500 px-5 py-2 text-center text-sm font-semibold text-white shadow hover:bg-orange-400"
                        >
                            + Add Member
                        </Link>
                    </div>

                    <div className="overflow-x-auto rounded-xl bg-white shadow">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-900 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                                <tr>
                                    <th className="px-4 py-3">Member</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Plan</th>
                                    <th className="px-4 py-3">Start</th>
                                    <th className="px-4 py-3">Expiry</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {members.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-12 text-center text-slate-500">
                                            <div className="text-4xl">🏋️</div>
                                            <p className="mt-2">No members found.</p>
                                        </td>
                                    </tr>
                                )}

                                {members.map((m) => (
                                    <tr key={m.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                                                    {m.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-slate-900">{m.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{m.contact}</td>
                                        <td className="px-4 py-3">
                                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                                                {m.membership_type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{m.start_date}</td>
                                        <td className="px-4 py-3 text-slate-600">{m.expiry_date}</td>
                                        <td className="px-4 py-3">
                                            {isExpired(m) ? (
                                                <div>
                                                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                                                        Expired
                                                    </span>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {Math.abs(daysLeft(m))} day(s) ago
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                                        Active
                                                    </span>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {daysLeft(m)} day(s) left
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="space-x-2 px-4 py-3 text-right">
                                            <Link
                                                href={route('members.edit', m.id)}
                                                className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(m)}
                                                className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}