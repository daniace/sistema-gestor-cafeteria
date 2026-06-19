<?php

namespace Database\Seeders;

use App\Models\MetodoPago;
use Illuminate\Database\Seeder;

class MetodoPagoSeeder extends Seeder
{
    public function run(): void
    {
        $metodos = [
            ['descripcion' => 'Efectivo', 'habilitado' => true, 'descuento' => 0],
            ['descripcion' => 'Débito', 'habilitado' => true, 'descuento' => 0],
            ['descripcion' => 'Crédito', 'habilitado' => true, 'descuento' => 0],
            ['descripcion' => 'QR', 'habilitado' => true, 'descuento' => 5],
        ];

        foreach ($metodos as $metodo) {
            MetodoPago::create($metodo);
        }
    }
}
