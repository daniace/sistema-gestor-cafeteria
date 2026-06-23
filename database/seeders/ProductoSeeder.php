<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            ['descripcion' => 'Café Latte', 'categoria_id' => 3, 'precio' => 3200.00, 'stock_actual' => 50, 'stock_minimo' => 10],
            ['descripcion' => 'Café Americano', 'categoria_id' => 3, 'precio' => 2700.00, 'stock_actual' => 50, 'stock_minimo' => 10],
            ['descripcion' => 'Capuchino', 'categoria_id' => 3, 'precio' => 3500.00, 'stock_actual' => 50, 'stock_minimo' => 10],
            ['descripcion' => 'Moccaccino', 'categoria_id' => 3, 'precio' => 3800.00, 'stock_actual' => 40, 'stock_minimo' => 10],
            ['descripcion' => 'Té Chai', 'categoria_id' => 3, 'precio' => 2900.00, 'stock_actual' => 30, 'stock_minimo' => 5],
            ['descripcion' => 'Smoothie de Frutilla', 'categoria_id' => 4, 'precio' => 3500.00, 'stock_actual' => 25, 'stock_minimo' => 5],
            ['descripcion' => 'Limonada Natural', 'categoria_id' => 4, 'precio' => 2500.00, 'stock_actual' => 40, 'stock_minimo' => 10],
            ['descripcion' => 'Iced Latte', 'categoria_id' => 4, 'precio' => 3400.00, 'stock_actual' => 35, 'stock_minimo' => 10],
            ['descripcion' => 'Tostado de Jamón y Queso', 'categoria_id' => 5, 'precio' => 4200.00, 'stock_actual' => 20, 'stock_minimo' => 5],
            ['descripcion' => 'Sándwich Veggie', 'categoria_id' => 5, 'precio' => 3800.00, 'stock_actual' => 15, 'stock_minimo' => 5],
            ['descripcion' => 'Cheesecake', 'categoria_id' => 2, 'precio' => 4000.00, 'stock_actual' => 12, 'stock_minimo' => 3],
            ['descripcion' => 'Brownie con Helado', 'categoria_id' => 2, 'precio' => 4500.00, 'stock_actual' => 10, 'stock_minimo' => 3],
            ['descripcion' => 'Helado de Vainilla (2 bochas)', 'categoria_id' => 1, 'precio' => 2800.00, 'stock_actual' => 30, 'stock_minimo' => 5],
            ['descripcion' => 'Medialuna (x1)', 'categoria_id' => 6, 'precio' => 800.00, 'stock_actual' => 100, 'stock_minimo' => 20],
            ['descripcion' => 'Alfajor Artesanal', 'categoria_id' => 6, 'precio' => 1500.00, 'stock_actual' => 25, 'stock_minimo' => 5],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
