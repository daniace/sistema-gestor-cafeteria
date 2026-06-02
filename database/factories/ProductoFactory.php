<?php

namespace Database\Factories;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'descripcion' => $this->faker->sentence,
            'categoria' => $this->faker->randomNumber,
            'stock_actual' => $this->faker->randomNumber,
            'stock_minimo' => $this->faker->randomNumber,
            'precio' => $this->faker->randomFloat(2),
            'producto_esta_vigente' => $this->faker->boolean,
            'motivo_baja' => $this->faker->sentence,
        ];
    }
}
