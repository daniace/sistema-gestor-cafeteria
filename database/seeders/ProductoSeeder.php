<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            // Bebidas Calientes (categoria_id = 3)
            ['descripcion' => 'Café Latte', 'categoria_id' => 3, 'precio' => 3200.00, 'stock_actual' => 50, 'stock_minimo' => 10, 'producto_esta_vigente' => true],
            ['descripcion' => 'Café Americano', 'categoria_id' => 3, 'precio' => 2700.00, 'stock_actual' => 50, 'stock_minimo' => 10, 'producto_esta_vigente' => true],
            ['descripcion' => 'Capuchino', 'categoria_id' => 3, 'precio' => 3500.00, 'stock_actual' => 50, 'stock_minimo' => 10, 'producto_esta_vigente' => true],
            ['descripcion' => 'Té Chai', 'categoria_id' => 3, 'precio' => 2900.00, 'stock_actual' => 30, 'stock_minimo' => 5, 'producto_esta_vigente' => true],

            // Bebidas Frías (categoria_id = 4)
            ['descripcion' => 'Smoothie de Frutilla', 'categoria_id' => 4, 'precio' => 3500.00, 'stock_actual' => 25, 'stock_minimo' => 5, 'producto_esta_vigente' => true],
            ['descripcion' => 'Limonada Natural', 'categoria_id' => 4, 'precio' => 2500.00, 'stock_actual' => 40, 'stock_minimo' => 10, 'producto_esta_vigente' => true],
            ['descripcion' => 'Iced Latte', 'categoria_id' => 4, 'precio' => 3400.00, 'stock_actual' => 35, 'stock_minimo' => 10, 'producto_esta_vigente' => true],

            // Sándwiches y Tostas (categoria_id = 5)
            ['descripcion' => 'Tostado de Jamón y Queso', 'categoria_id' => 5, 'precio' => 4200.00, 'stock_actual' => 20, 'stock_minimo' => 5, 'producto_esta_vigente' => true],
            ['descripcion' => 'Sándwich Veggie', 'categoria_id' => 5, 'precio' => 3800.00, 'stock_actual' => 15, 'stock_minimo' => 5, 'producto_esta_vigente' => true],

            // Postres (categoria_id = 2)
            ['descripcion' => 'Cheesecake', 'categoria_id' => 2, 'precio' => 4000.00, 'stock_actual' => 12, 'stock_minimo' => 3, 'producto_esta_vigente' => true],
            ['descripcion' => 'Brownie con Helado', 'categoria_id' => 2, 'precio' => 4500.00, 'stock_actual' => 10, 'stock_minimo' => 3, 'producto_esta_vigente' => true],

            // Helados (categoria_id = 1)
            ['descripcion' => 'Helado de Vainilla (2 bochas)', 'categoria_id' => 1, 'precio' => 2800.00, 'stock_actual' => 30, 'stock_minimo' => 5, 'producto_esta_vigente' => true],
            ['descripcion' => 'Helado de Chocolate (2 bochas)', 'categoria_id' => 1, 'precio' => 2800.00, 'stock_actual' => 25, 'stock_minimo' => 5, 'producto_esta_vigente' => true],

            // Facturas y Pastelería (categoria_id = 6)
            ['descripcion' => 'Medialuna (x1)', 'categoria_id' => 6, 'precio' => 800.00, 'stock_actual' => 100, 'stock_minimo' => 20, 'producto_esta_vigente' => true],

            // Ensaladas y Bowls (categoria_id = 7)
            ['descripcion' => 'Bowl Veggie con Quinoa', 'categoria_id' => 7, 'precio' => 4800.00, 'stock_actual' => 15, 'stock_minimo' => 5, 'producto_esta_vigente' => true],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}
