<?php

use App\Models\Mesa;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\User;

/* ─────────── STORE ─────────── */

test('puede crear pedido con datos válidos', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create(['estado' => 'libre']);
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 3, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $this->assertDatabaseHas('pedidos', [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'estado' => 'pendiente',
    ]);

    $mesa->refresh();
    expect($mesa->estado)->toBe('ocupada');

    $producto->refresh();
    expect($producto->stock_actual)->toBe(7);
});

test('no permite pedido en mesa ocupada', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create(['estado' => 'libre']);
    $producto = Producto::factory()->conStock(10)->create();

    // Ocupar la mesa creando un pedido primero
    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Primer cliente',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    // Intentar otro pedido en la misma mesa
    $producto2 = Producto::factory()->conStock(10)->create();

    $response = $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Segundo cliente',
        'productos' => [
            ['id' => $producto2->id, 'cantidad' => 1, 'precio_unitario' => $producto2->precio],
        ],
    ]);

    $response->assertSessionHasErrors('numero_mesa');
});

test('no permite pedido sin productos', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();

    $response = $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [],
    ]);

    $response->assertSessionHasErrors('productos');
});

test('no permite pedido con stock_actual cero', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->sinStock()->create();

    $response = $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $response->assertSessionHasErrors('productos.0.cantidad');
});

test('no permite cantidad mayor al stock disponible', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(3)->create();

    $response = $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 5, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $response->assertSessionHasErrors('productos.0.cantidad');
});

/* ─────────── UPDATE ─────────── */

test('modifica pedido agregando producto', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $productoA = Producto::factory()->conStock(10)->create();
    $productoB = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $productoA->id, 'cantidad' => 2, 'precio_unitario' => $productoA->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->put(route('pedido.update', $pedido), [
        'productos' => [
            ['id' => $productoA->id, 'cantidad' => 2, 'precio_unitario' => $productoA->precio],
            ['id' => $productoB->id, 'cantidad' => 3, 'precio_unitario' => $productoB->precio],
        ],
    ]);

    $productoB->refresh();
    expect($productoB->stock_actual)->toBe(7);

    $productoA->refresh();
    expect($productoA->stock_actual)->toBe(8);

    $pedido->refresh();
    expect($pedido->productos)->toHaveCount(2);
});

test('modifica pedido aumentando cantidad', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 2, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->put(route('pedido.update', $pedido), [
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 5, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $producto->refresh();
    expect($producto->stock_actual)->toBe(5);
});

test('modifica pedido reduciendo cantidad', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(5)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 4, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    expect($producto->fresh()->stock_actual)->toBe(1);

    $this->actingAs($user)->put(route('pedido.update', $pedido), [
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 1, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $producto->refresh();
    expect($producto->stock_actual)->toBe(4);
});

test('modifica pedido eliminando producto', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $productoA = Producto::factory()->conStock(10)->create();
    $productoB = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $productoA->id, 'cantidad' => 3, 'precio_unitario' => $productoA->precio],
            ['id' => $productoB->id, 'cantidad' => 5, 'precio_unitario' => $productoB->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->put(route('pedido.update', $pedido), [
        'productos' => [
            ['id' => $productoA->id, 'cantidad' => 3, 'precio_unitario' => $productoA->precio],
        ],
    ]);

    $productoB->refresh();
    expect($productoB->stock_actual)->toBe(10);

    $pedido->refresh();
    expect($pedido->productos)->toHaveCount(1);
});

test('no modifica pedido completado', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 2, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    $pedido->update(['estado' => 'completado']);

    $response = $this->actingAs($user)->put(route('pedido.update', $pedido), [
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 5, 'precio_unitario' => $producto->precio],
        ],
    ]);

    expect($response->isForbidden() || $response->isRedirect())->toBeTrue();
});

/* ─────────── CANCEL ─────────── */

test('puede cancelar pedido pendiente', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create(['estado' => 'libre']);
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 3, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->delete(route('pedido.cancel', $pedido));

    $pedido->refresh();
    expect($pedido->estado)->toBe('cancelado');
    expect($pedido->productos)->toHaveCount(0);

    $producto->refresh();
    expect($producto->stock_actual)->toBe(10);

    $mesa->refresh();
    expect($mesa->estado)->toBe('libre');
});

test('no permite cancelar pedido completado', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 2, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    $pedido->update(['estado' => 'completado']);

    $response = $this->actingAs($user)->delete(route('pedido.cancel', $pedido));

    expect($response->isForbidden() || $response->isRedirect())->toBeTrue();
});

test('no permite cancelar pedido ya cancelado', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $producto = Producto::factory()->conStock(10)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $producto->id, 'cantidad' => 2, 'precio_unitario' => $producto->precio],
        ],
    ]);

    $pedido = Pedido::first();
    $pedido->update(['estado' => 'cancelado']);

    $response = $this->actingAs($user)->delete(route('pedido.cancel', $pedido));

    expect($response->isForbidden() || $response->isRedirect())->toBeTrue();
});

test('restaura stock de todos los productos al cancelar', function () {
    $user = User::factory()->create();
    $mesa = Mesa::factory()->create();
    $productoA = Producto::factory()->conStock(10)->create();
    $productoB = Producto::factory()->conStock(5)->create();

    $this->actingAs($user)->post(route('pedido.store'), [
        'numero_mesa' => $mesa->numero,
        'cliente' => 'Test',
        'productos' => [
            ['id' => $productoA->id, 'cantidad' => 4, 'precio_unitario' => $productoA->precio],
            ['id' => $productoB->id, 'cantidad' => 2, 'precio_unitario' => $productoB->precio],
        ],
    ]);

    $pedido = Pedido::first();

    $this->actingAs($user)->delete(route('pedido.cancel', $pedido));

    $productoA->refresh();
    $productoB->refresh();
    expect($productoA->stock_actual)->toBe(10);
    expect($productoB->stock_actual)->toBe(5);
});
