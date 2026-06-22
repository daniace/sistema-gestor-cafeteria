<?php

use App\Http\Controllers\MesaController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VentaController;
use App\Models\Mesa;
use App\Models\MetodoPago;
use App\Models\Producto;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'auth/login', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('inicio', function () {
        return Inertia::render('inicio', [
            'productos' => Producto::all(),
            'mesas' => Mesa::orderBy('numero')->get(),
            'metodoPagos' => MetodoPago::where('habilitado', true)->get(),
        ]);
    })->name('inicio');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('pedidos', [PedidoController::class, 'store'])->name('pedido.store');
    Route::get('pedidos/{pedido}', [PedidoController::class, 'show'])->name('pedido.show');
    Route::get('pedidos/{pedido}/ticket', [PedidoController::class, 'ticket'])->name('pedido.ticket');
    Route::put('pedidos/{pedido}', [PedidoController::class, 'update'])->name('pedido.update');
    Route::patch('pedidos/{pedido}', [PedidoController::class, 'update']);
});

Route::middleware(['auth', 'verified'])->group(function () {
Route::middleware(['auth', 'verified','role:admin,vendedor'])->group(function () {
    Route::get('productos', [ProductoController::class, 'index'])->name('producto');
    Route::post('productos', [ProductoController::class, 'store'])->name('producto.store');
    Route::get('productos/{producto}/edit', [ProductoController::class, 'edit'])->name('producto.edit');
    Route::put('productos/{producto}', [ProductoController::class, 'update'])->name('producto.update');
    Route::delete('productos/{producto}', [ProductoController::class, 'destroy'])->name('producto.destroy');

    Route::get('usuarios', [UserController::class, 'index'])->name('usuario');
    Route::post('usuarios', [UserController::class, 'store'])->name('usuario.store');
    Route::delete('usuarios/{user}', [UserController::class, 'destroy'])->name('usuario.destroy');
    Route::get('usuarios/{user}/edit', [UserController::class, 'edit'])->name('usuario.edit');
    Route::put('usuarios/{user}', [UserController::class, 'update'])->name('usuario.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('mesas', [MesaController::class, 'index'])->name('mesa.index');
    Route::post('mesas', [MesaController::class, 'store'])->name('mesa.store');
    Route::get('mesas/{mesa}/edit', [MesaController::class, 'edit'])->name('mesa.edit');
    Route::put('mesas/{mesa}', [MesaController::class, 'update'])->name('mesa.update');
    Route::delete('mesas/{mesa}', [MesaController::class, 'destroy'])->name('mesa.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('ventas', [VentaController::class, 'store'])->name('venta.store');
    Route::get('ventas', [VentaController::class, 'index'])->name('venta.index');
    Route::get('ventas/{venta}/ticket', [VentaController::class, 'ticket'])->name('venta.ticket');
});

require __DIR__.'/settings.php';
