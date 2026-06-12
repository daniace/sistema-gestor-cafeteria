<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('productos', 'producto/vista-producto')->name('producto');
    Route::get('usuarios', [UserController::class, 'index'])->name('usuario');
    Route::post('usuarios', [UserController::class, 'store'])->name('usuario.store');
    Route::delete('usuarios/{user}', [UserController::class, 'destroy'])->name('usuario.destroy');
    Route::get('usuarios/{user}/edit', [UserController::class, 'edit'])->name('usuario.edit');
    Route::put('usuarios/{user}', [UserController::class, 'update'])->name('usuario.update');
});

require __DIR__.'/settings.php';
