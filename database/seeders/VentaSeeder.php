<?php

namespace Database\Seeders;

use App\Models\MetodoPago;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VentaSeeder extends Seeder
{
    public function run(): void
    {
        $productos = Producto::where('producto_esta_vigente', true)->get();
        $metodoPagos = MetodoPago::where('habilitado', true)->get();
        $nombres = [
            'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Pedro Rodríguez',
            'Laura Fernández', 'Diego González', 'Sofía Hernández', 'Luis Torres', 'Valentina Díaz',
            'Mateo Álvarez', 'Camila Ruiz', 'Santiago Castillo', 'Isabella Ortiz', 'Benjamín Morales',
            'Emilia Silva', 'Sebastián Rojas', 'Luciana Vargas', 'Joaquín Mendoza', 'Catalina Herrera',
            'Samuel Cruz', 'Gabriela Reyes', 'Daniel Vega', 'Victoria Peña', 'Matías Flores',
            'Martina Campos', 'Adrián Núñez', 'Abigail Delgado', 'Lucas Paredes', 'Constanza Aguirre',
            'Felipe Guerrero', 'Josefina Cárdenas', 'Nicolás Salazar', 'Catalina Moreno', 'Tomás Medina',
            'Florencia Romero', 'Maximiliano Castro', 'Agustina Paz', 'Julián Valenzuela', 'Amanda Cortés',
            'Emilio Farías', 'Javiera Correa', 'Alonso Bustos', 'Fernanda Bravo', 'Cristóbal Vega',
            'Trinidad Sandoval', 'Martín Rivas', 'Antonia Pizarro', 'Vicente Gallardo', 'Emilia Peña',
        ];
        $startDate = Carbon::parse('2025-12-01');
        $endDate = Carbon::parse('2026-06-23');

        for ($i = 0; $i < 1000; $i++) {
            $createdAt = Carbon::createFromTimestamp(
                mt_rand($startDate->timestamp, $endDate->timestamp)
            );

            $pedido = Pedido::create([
                'cliente' => $nombres[array_rand($nombres)],
                'estado' => 'completado',
                'total' => 0,
                'user_id' => 1,
                'numero_mesa' => rand(1, 10),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            $itemsCount = rand(1, 5);
            $totalOriginal = 0;
            $selected = $productos->random($itemsCount);

            $syncData = [];
            foreach ($selected as $producto) {
                $cantidad = rand(1, 3);
                $syncData[$producto->id] = [
                    'cantidad' => $cantidad,
                    'precio_unitario' => $producto->precio,
                ];
                $totalOriginal += $cantidad * $producto->precio;
            }

            $pedido->productos()->sync($syncData);
            $pedido->update(['total' => $totalOriginal]);

            $metodoPago = $metodoPagos->random();
            $descuento = (float) $metodoPago->descuento;
            $totalFinal = $totalOriginal - ($totalOriginal * $descuento / 100);

            Venta::create([
                'pedido_id' => $pedido->id,
                'metodo_pago_id' => $metodoPago->id,
                'total_original' => $totalOriginal,
                'total_final' => $totalFinal,
                'descuento_aplicado' => $descuento,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
