<?php

use App\Models\User;

beforeEach(fn () => $this->actingAs(User::factory()->create()));

//TEST DE DESCRIPCIÓN
test('DescripcionRequerida', function () {
    $this->post(route('producto.store'), [
        'descripcion' => '',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 999,
    ])->assertSessionHasErrors('descripcion');
});

test('DescripcionMayorAMaximoCaracteres', function () {
    $this->post(route('producto.store'), [
        'descripcion' => str_repeat('a', 256),
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 1000.00,
    ])->assertSessionHasErrors('descripcion');
});

test('DescripcionFormatoInvalido', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 0,
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 99.999,
    ])->assertSessionHasErrors('descripcion');
});


test('DescripcionFormatoInvalidoCadenaConNumeros', function () {
    $this->post(route('producto.store'), [
        'descripcion' => "Helado 0",
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 99.9,
    ])->assertSessionHasErrors('descripcion');
});


//TESTS DE CATEGORIA

test('CategoriaRequerida', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => '',
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 999,
    ])->assertSessionHasErrors('categoria');
});

test('CategoriaMayorAMaximoCaracteres', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => str_repeat('a', 256),
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 1000.00,
    ])->assertSessionHasErrors('categoria');
});

test('CategoriaFormatoInvalido', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => 'a',
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 99.99,
    ])->assertSessionHasErrors('categoria');
});



//TESTS DE STOCK ACTUAL
test('StockActualRequerido', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => 1,
        'stock_actual' => '',
        'stock_minimo' => 5,
        'precio' => 99.99,
    ])->assertSessionHasErrors('stock_actual');
});

test('StockActualConDecimales', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10.02,
        'stock_minimo' => 5,
        'precio' => 99.99,
    ])->assertSessionHasErrors('stock_actual');
});

test('StockActualMayorAlLimite', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10000.00,
        'stock_minimo' => 5,
        'precio' => 99.99,
    ])->assertSessionHasErrors('stock_actual');
});

test('StockActualFormatoCadena', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => '10',
        'stock_minimo' => 5,
        'precio' => 99.99,
    ])->assertSessionHasErrors('stock_actual');
});



//TESTS DE STOCK MINIMO
test('StockMinimoRequerido', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => '',
        'precio' => 123.00,
    ])->assertSessionHasErrors('stock_minimo');
});

test('StockMinimoMayorALimite', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 10000,
        'precio' => 1000.00,
    ])->assertSessionHasErrors('stock_minimo');
});

test('StockMinimoConDecimales', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5.5,
        'precio' => 1000.00,
    ])->assertSessionHasErrors('stock_minimo');
});

test('StockMinimoFormatoCadena', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => '5',
        'precio' => 99.99,
    ])->assertSessionHasErrors('stock_minimo');
});



//TESTS DE PRECIOS
test('PrecioRequerido', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'prueba',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => '',
    ])->assertSessionHasErrors('precio');
});

test('PrecioMayorA2Decimales', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 99.999,
    ])->assertSessionHasErrors('precio');
});

test('PrecioMayorAlLimite', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => 10000.00,
    ])->assertSessionHasErrors('precio');
});

test('PrecioFormatoCadena', function () {
    $this->post(route('producto.store'), [
        'descripcion' => 'Test',
        'categoria' => 1,
        'stock_actual' => 10,
        'stock_minimo' => 5,
        'precio' => '99.999',
    ])->assertSessionHasErrors('precio');
});
