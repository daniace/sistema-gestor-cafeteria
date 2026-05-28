<?php

use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('productos', [ProductoController::class, 'index'])->name('producto');
    Route::post('productos', [ProductoController::class, 'store'])->name('producto.store');
});

require __DIR__.'/settings.php';
