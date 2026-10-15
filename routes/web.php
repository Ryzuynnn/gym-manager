<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Models\Member;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    $today = now()->toDateString();
    $nextWeek = now()->addDays(7)->toDateString();

    return Inertia::render('Dashboard', [
        'total' => Member::count(),
        'active' => Member::where('expiry_date', '>=', $today)->count(),
        'expired' => Member::where('expiry_date', '<', $today)->count(),
        'expiringSoon' => Member::where('expiry_date', '>=', $today)
            ->where('expiry_date', '<=', $nextWeek)
            ->orderBy('expiry_date')
            ->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('members', MemberController::class)->except('show');
});

require __DIR__.'/auth.php';