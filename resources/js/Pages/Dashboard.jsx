import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function StatCard({ label, value, icon, border }) {
    return (
        <div className={`flex items-center justify-between rounded-xl border-l-4 bg-white p-6 shadow ${border}`}>
            <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-4xl font-extrabold text-slate-900">{value}</p>
            </div>
            <div className="text-4xl">{icon}</div>
        </div>
    );
}

export default function Dashboard({ total = 0, active = 0, expired = 0, expiringSoon = [] }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <StatCard label="Total Members" value={total} icon="👥" border="border-slate-700" />
                        <StatCard label="Active" value={active} icon="✅" border="border-green-500" />
                        <StatCard label="Expired" value={expired} icon="⛔" border="border-red-500" />
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Expiring in the next 7 days</h3>
                            <Link
                                href={route('members.create')}
                                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400"
                            >
                                + Add Member
                            </Link>
                        </div>

                        {expiringSoon.length === 0 ? (
                            <p className="mt-6 text-sm text-slate-500">No memberships expiring soon. 🎉</p>
                        ) : (
                            <ul className="mt-4 divide-y divide-slate-100">
                                {expiringSoon.map((m) => (
                                    <li key={m.id} className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{m.name}</p>
                                            <p className="text-sm text-slate-500">
                                                {m.membership_type} · {m.contact}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                            Expires {m.expiry_date}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
