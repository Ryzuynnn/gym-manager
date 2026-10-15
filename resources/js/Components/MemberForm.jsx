
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

const inputClass =
    'mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500';
const labelClass = 'block text-sm font-semibold text-slate-700';

export default function MemberForm({ data, setData, errors, processing, onSubmit, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className={labelClass}>Full Name</label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={inputClass}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <label htmlFor="contact" className={labelClass}>Contact Number</label>
                <input
                    id="contact"
                    type="text"
                    value={data.contact}
                    onChange={(e) => setData('contact', e.target.value)}
                    className={inputClass}
                />
                <InputError message={errors.contact} className="mt-2" />
            </div>

            <div>
                <label htmlFor="membership_type" className={labelClass}>Membership Type</label>
                <select
                    id="membership_type"
                    value={data.membership_type}
                    onChange={(e) => setData('membership_type', e.target.value)}
                    className={inputClass}
                >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                <InputError message={errors.membership_type} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="start_date" className={labelClass}>Start Date</label>
                    <input
                        id="start_date"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        className={inputClass}
                    />
                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="expiry_date" className={labelClass}>Expiry Date</label>
                    <input
                        id="expiry_date"
                        type="date"
                        value={data.expiry_date}
                        onChange={(e) => setData('expiry_date', e.target.value)}
                        className={inputClass}
                    />
                    <InputError message={errors.expiry_date} className="mt-2" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-orange-400 disabled:opacity-50"
                >
                    {submitLabel}
                </button>
                <Link href={route('members.index')} className="text-sm text-slate-600 underline hover:text-slate-900">
                    Cancel
                </Link>
            </div>
        </form>
    );
}