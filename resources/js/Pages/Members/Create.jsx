import MemberForm from '@/Components/MemberForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact: '',
        membership_type: 'Monthly',
        start_date: '',
        expiry_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('members.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Member</h2>}
        >
            <Head title="Add Member" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <MemberForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Save Member"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}