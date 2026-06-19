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
            'descripcion' => $this->faker->sentence(3),
            'categoria' => $this->faker->numberBetween(1, 5),
            'stock_actual' => $this->faker->numberBetween(1, 100),
            'stock_minimo' => $this->faker->numberBetween(1, 10),
            'precio' => $this->faker->randomFloat(2, 5, 100),
            'producto_esta_vigente' => true,
            'motivo_baja' => null,
        ];
    }

    public function sinStock(): static
    {
        return $this->state(fn () => [
            'stock_actual' => 0,
        ]);
    }

    public function conStock(int $cantidad): static
    {
        return $this->state(fn () => [
            'stock_actual' => $cantidad,
        ]);
    }
}
