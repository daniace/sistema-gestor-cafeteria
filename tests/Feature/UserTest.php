<?php

use App\Models\Rol;
use App\Models\User;

beforeEach(fn () => $this->actingAs(User::factory()->create()));

// ─────────── STORE ───────────

test('puede crear usuario con datos válidos', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'email' => 'juan@example.com',
        'dni' => '12345678',
        'estado_cuenta_usuario' => true,
    ]);
});

test('nombre requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => '',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('nombre');
});

test('nombre solo letras', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan 123',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('nombre');
});

test('nombre mayor a 255 caracteres', function () {
    $this->post(route('usuario.store'), [
        'nombre' => str_repeat('a', 256),
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('nombre');
});

test('apellido requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => '',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('apellido');
});

test('apellido solo letras', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez 123',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('apellido');
});

test('email requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => '',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('email');
});

test('email formato invalido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'invalido',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('email');
});

test('email duplicado', function () {
    User::factory()->create(['email' => 'existente@example.com']);

    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'existente@example.com',
        'password' => 'secret123',
        'dni' => '87654321',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('email');
});

test('password requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => '',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('password');
});

test('password minimo 8 caracteres', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => '1234567',
        'dni' => '12345678',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('password');
});

test('dni requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('dni');
});

test('dni duplicado', function () {
    User::factory()->create(['dni' => '11111111']);

    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '11111111',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('dni');
});

test('nro_rol requerido', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
    ])->assertSessionHasErrors('nro_rol');
});

test('nro_rol debe existir en roles', function () {
    $this->post(route('usuario.store'), [
        'nombre' => 'Juan',
        'apellido' => 'Pérez',
        'email' => 'juan@example.com',
        'password' => 'secret123',
        'dni' => '12345678',
        'nro_rol' => 999,
    ])->assertSessionHasErrors('nro_rol');
});

// ─────────── UPDATE ───────────

test('puede actualizar usuario con datos válidos', function () {
    $user = User::factory()->create();

    $this->put(route('usuario.update', $user), [
        'nombre' => 'Carlos',
        'apellido' => 'García',
        'email' => 'carlos@example.com',
        'dni' => '87654321',
        'nro_rol' => Rol::first()->id,
    ])->assertRedirect();

    $user->refresh();
    expect($user->nombre)->toBe('Carlos');
    expect($user->apellido)->toBe('García');
    expect($user->email)->toBe('carlos@example.com');
    expect($user->dni)->toBe('87654321');
});

test('update nombre requerido', function () {
    $user = User::factory()->create();

    $this->put(route('usuario.update', $user), [
        'nombre' => '',
        'apellido' => 'García',
        'email' => 'carlos@example.com',
        'dni' => '87654321',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('nombre');
});

test('update apellido requerido', function () {
    $user = User::factory()->create();

    $this->put(route('usuario.update', $user), [
        'nombre' => 'Carlos',
        'apellido' => '',
        'email' => 'carlos@example.com',
        'dni' => '87654321',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('apellido');
});

test('update email requerido', function () {
    $user = User::factory()->create();

    $this->put(route('usuario.update', $user), [
        'nombre' => 'Carlos',
        'apellido' => 'García',
        'email' => '',
        'dni' => '87654321',
        'nro_rol' => Rol::first()->id,
    ])->assertSessionHasErrors('email');
});

test('update nro_rol requerido', function () {
    $user = User::factory()->create();

    $this->put(route('usuario.update', $user), [
        'nombre' => 'Carlos',
        'apellido' => 'García',
        'email' => 'carlos@example.com',
        'dni' => '87654321',
    ])->assertSessionHasErrors('nro_rol');
});

// ─────────── DESTROY ───────────

test('puede dar de baja usuario', function () {
    $user = User::factory()->create();

    $this->delete(route('usuario.destroy', $user), [
        'causa_eliminacion' => 'Renuncia voluntaria',
    ])->assertRedirect();

    $user->refresh();
    expect($user->estado_cuenta_usuario)->toBeFalsy();
    expect($user->causa_eliminacion)->toBe('Renuncia voluntaria');
});

test('destroy causa_eliminacion requerida', function () {
    $user = User::factory()->create();

    $this->delete(route('usuario.destroy', $user), [
        'causa_eliminacion' => '',
    ])->assertSessionHasErrors('causa_eliminacion');
});
