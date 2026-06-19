<?php

use App\Models\Mesa;
use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\User;

/* ─────────── STORE ─────────── */

test('crea venta con datos válidos', function () {
    $user = User::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();
    $metodoPago = MetodoPago::create([
        'descripcion' => 'Efectivo',
        'habilitado' => true,
        'descuento' => 0,
    ]);

    // Crear un pedido pendiente primero
    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => Mesa::factory()->create()->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 3, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    $mesa = $pedido->mesa;

    $this->actingAs($user)->post(route('venta.store'), [
        'pedido_id' => $pedido->id,
        'metodo_pago_id' => $metodoPago->id,
    ]);

    $this->assertDatabaseHas('ventas', [
        'pedido_id' => $pedido->id,
        'metodo_pago_id' => $metodoPago->id,
    ]);

    $pedido->refresh();
    expect($pedido->estado)->toBe('completado');

    $mesa->refresh();
    expect($mesa->estado)->toBe('libre');
});

test('no permite venta sin metodo de pago', function () {
    $user = User::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => Mesa::factory()->create()->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $response = $this->actingAs($user)->post(route('venta.store'), [
        'pedido_id' => $pedido->id,
    ]);

    $response->assertSessionHasErrors('metodo_pago_id');
});

test('no permite venta duplicada para mismo pedido', function () {
    $user = User::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();
    $metodoPago = MetodoPago::create([
        'descripcion' => 'Efectivo',
        'habilitado' => true,
        'descuento' => 0,
    ]);

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => Mesa::factory()->create()->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->post(route('venta.store'), [
        'pedido_id' => $pedido->id,
        'metodo_pago_id' => $metodoPago->id,
    ]);

    $response = $this->actingAs($user)->post(route('venta.store'), [
        'pedido_id' => $pedido->id,
        'metodo_pago_id' => $metodoPago->id,
    ]);

    $response->assertSessionHasErrors('pedido_id');
});

test('no permite venta para pedido completado', function () {
    $user = User::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();
    $metodoPago = MetodoPago::create([
        'descripcion' => 'Efectivo',
        'habilitado' => true,
        'descuento' => 0,
    ]);

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => Mesa::factory()->create()->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    $pedido->update(['estado' => 'completado']);

    $response = $this->actingAs($user)->post(route('venta.store'), [
        'pedido_id' => $pedido->id,
        'metodo_pago_id' => $metodoPago->id,
    ]);

    $response->assertSessionHasErrors('pedido_id');
});
