<?php

namespace Database\Factories;

use App\Models\Mesa;
use App\Models\Pedido;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pedido>
 */
class PedidoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cliente' => $this->faker->name(),
            'estado' => 'pendiente',
            'total' => $this->faker->randomFloat(2, 10, 500),
            'user_id' => null,
            'numero_mesa' => fn () => Mesa::factory()->create()->numero,
        ];
    }
}
