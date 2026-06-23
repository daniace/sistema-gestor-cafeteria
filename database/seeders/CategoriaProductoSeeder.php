<?php

namespace Database\Seeders;

use App\Models\CategoriaProducto;
use Illuminate\Database\Seeder;

class CategoriaProductoSeeder extends Seeder
{
    public function run(): void
    {
        CategoriaProducto::create(['nombre_categoria_producto' => 'Helados']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Postres']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Bebidas Calientes']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Bebidas Frías']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Sándwiches y Tostas']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Facturas y Pastelería']);
        CategoriaProducto::create(['nombre_categoria_producto' => 'Ensaladas y Bowls']);
    }
}
