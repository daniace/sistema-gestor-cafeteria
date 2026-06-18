<?php

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use App\Models\Producto;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('inicio', function () {
        return Inertia::render('inicio', [
            'productos' => Producto::all(),
        ]);
    })->name('inicio');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('pedidos', [PedidoController::class, 'store'])->name('pedido.store');
    Route::get('pedidos/{pedido}', [PedidoController::class, 'show'])->name('pedido.show');
    Route::get('pedidos/{pedido}/ticket', [PedidoController::class, 'ticket'])->name('pedido.ticket');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('productos', [ProductoController::class, 'index'])->name('producto');
    Route::post('productos', [ProductoController::class, 'store'])->name('producto.store');
    Route::get('productos/{producto}/edit', [ProductoController::class, 'edit'])->name('producto.edit');
    Route::put('productos/{producto}', [ProductoController::class, 'update'])->name('producto.update');
    Route::get('usuarios', [UserController::class, 'index'])->name('usuario');
    Route::post('usuarios', [UserController::class, 'store'])->name('usuario.store');
    Route::delete('usuarios/{user}', [UserController::class, 'destroy'])->name('usuario.destroy');
    Route::get('usuarios/{user}/edit', [UserController::class, 'edit'])->name('usuario.edit');
    Route::put('usuarios/{user}', [UserController::class, 'update'])->name('usuario.update');
});

require __DIR__.'/settings.php';
