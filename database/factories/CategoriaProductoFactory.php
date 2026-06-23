<?php

namespace Database\Factories;

use App\Models\CategoriaProducto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CategoriaProducto>
 */
class CategoriaProductoFactory extends Factory
{
    protected static array $nombres = [
        'Helados',
        'Postres',
        'Bebidas Calientes',
        'Bebidas Frías',
        'Sándwiches y Tostas',
        'Facturas y Pastelería',
        'Ensaladas y Bowls',
    ];

    public function definition(): array
    {
        return [
            'nombre_categoria_producto' => fake()->unique()->randomElement(static::$nombres),
        ];
    }
}
