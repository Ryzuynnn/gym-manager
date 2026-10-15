<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    private function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:50',
            'membership_type' => 'required|in:Monthly,Quarterly,Yearly',
            'start_date' => 'required|date',
            'expiry_date' => 'required|date|after_or_equal:start_date',
        ];
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $members = Member::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->latest()
            ->get();

        return Inertia::render('Members/Index', [
            'members' => $members,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('Members/Create');
    }

    public function store(Request $request)
    {
        Member::create($request->validate($this->rules()));

        return redirect()->route('members.index');
    }

    public function edit(Member $member)
    {
        return Inertia::render('Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $member->update($request->validate($this->rules()));

        return redirect()->route('members.index');
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('members.index');
    }
}