import MemberForm from '@/Components/MemberForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ member }) {
    const { data, setData, put, processing, errors } = useForm({
        name: member.name,
        contact: member.contact,
        membership_type: member.membership_type,
        start_date: member.start_date,
        expiry_date: member.expiry_date,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('members.update', member.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Member</h2>}
        >
            <Head title="Edit Member" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <MemberForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Update Member"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}