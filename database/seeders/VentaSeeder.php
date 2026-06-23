<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VentaSeeder extends Seeder
{
    public function run(): void
    {
        $productos = Producto::where('producto_esta_vigente', true)->get()->keyBy('descripcion');

        $ventas = [
            // Ventas con Efectivo (metodo_pago_id = 1, descuento = 0)
            [
                'cliente' => 'Juan Pérez',
                'numero_mesa' => 3,
                'metodo_pago_id' => 1,
                'items' => [
                    ['producto' => 'Café Latte', 'cantidad' => 2],
                    ['producto' => 'Medialuna (x1)', 'cantidad' => 2],
                ],
            ],
            [
                'cliente' => 'María García',
                'numero_mesa' => 5,
                'metodo_pago_id' => 1,
                'items' => [
                    ['producto' => 'Capuchino', 'cantidad' => 1],
                    ['producto' => 'Cheesecake', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Pedro Rodríguez',
                'numero_mesa' => 1,
                'metodo_pago_id' => 1,
                'items' => [
                    ['producto' => 'Tostado de Jamón y Queso', 'cantidad' => 1],
                    ['producto' => 'Café Americano', 'cantidad' => 1],
                    ['producto' => 'Limonada Natural', 'cantidad' => 1],
                ],
            ],

            // Ventas con Débito (metodo_pago_id = 2, descuento = 0)
            [
                'cliente' => 'Ana Martínez',
                'numero_mesa' => 2,
                'metodo_pago_id' => 2,
                'items' => [
                    ['producto' => 'Smoothie de Frutilla', 'cantidad' => 2],
                    ['producto' => 'Bowl Veggie con Quinoa', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Carlos López',
                'numero_mesa' => 7,
                'metodo_pago_id' => 2,
                'items' => [
                    ['producto' => 'Té Chai', 'cantidad' => 1],
                    ['producto' => 'Brownie con Helado', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Laura Fernández',
                'numero_mesa' => 4,
                'metodo_pago_id' => 2,
                'items' => [
                    ['producto' => 'Iced Latte', 'cantidad' => 1],
                    ['producto' => 'Sándwich Veggie', 'cantidad' => 1],
                    ['producto' => 'Helado de Chocolate (2 bochas)', 'cantidad' => 1],
                ],
            ],

            // Ventas con Crédito (metodo_pago_id = 3, descuento = 0)
            [
                'cliente' => 'Diego González',
                'numero_mesa' => 6,
                'metodo_pago_id' => 3,
                'items' => [
                    ['producto' => 'Café Americano', 'cantidad' => 3],
                    ['producto' => 'Medialuna (x1)', 'cantidad' => 3],
                ],
            ],
            [
                'cliente' => 'Sofía Hernández',
                'numero_mesa' => 8,
                'metodo_pago_id' => 3,
                'items' => [
                    ['producto' => 'Iced Latte', 'cantidad' => 1],
                    ['producto' => 'Cheesecake', 'cantidad' => 1],
                    ['producto' => 'Helado de Vainilla (2 bochas)', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Luis Torres',
                'numero_mesa' => 10,
                'metodo_pago_id' => 3,
                'items' => [
                    ['producto' => 'Tostado de Jamón y Queso', 'cantidad' => 2],
                    ['producto' => 'Limonada Natural', 'cantidad' => 2],
                    ['producto' => 'Café Latte', 'cantidad' => 2],
                ],
            ],

            // Ventas con QR (metodo_pago_id = 4, descuento = 5%)
            [
                'cliente' => 'Valentina Díaz',
                'numero_mesa' => 9,
                'metodo_pago_id' => 4,
                'items' => [
                    ['producto' => 'Capuchino', 'cantidad' => 1],
                    ['producto' => 'Bowl Veggie con Quinoa', 'cantidad' => 1],
                    ['producto' => 'Helado de Chocolate (2 bochas)', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Mateo Álvarez',
                'numero_mesa' => 2,
                'metodo_pago_id' => 4,
                'items' => [
                    ['producto' => 'Café Latte', 'cantidad' => 1],
                    ['producto' => 'Sándwich Veggie', 'cantidad' => 1],
                ],
            ],
            [
                'cliente' => 'Camila Ruiz',
                'numero_mesa' => 5,
                'metodo_pago_id' => 4,
                'items' => [
                    ['producto' => 'Smoothie de Frutilla', 'cantidad' => 1],
                    ['producto' => 'Brownie con Helado', 'cantidad' => 1],
                    ['producto' => 'Té Chai', 'cantidad' => 1],
                ],
            ],

            // Más ventas variadas
            [
                'cliente' => 'Benjamín Morales',
                'numero_mesa' => 1,
                'metodo_pago_id' => 1,
                'items' => [
                    ['producto' => 'Café Americano', 'cantidad' => 1],
                    ['producto' => 'Medialuna (x1)', 'cantidad' => 3],
                ],
            ],
            [
                'cliente' => 'Isabella Ortiz',
                'numero_mesa' => 4,
                'metodo_pago_id' => 2,
                'items' => [
                    ['producto' => 'Iced Latte', 'cantidad' => 2],
                    ['producto' => 'Cheesecake', 'cantidad' => 2],
                ],
            ],
            [
                'cliente' => 'Santiago Castillo',
                'numero_mesa' => 3,
                'metodo_pago_id' => 3,
                'items' => [
                    ['producto' => 'Capuchino', 'cantidad' => 2],
                    ['producto' => 'Tostado de Jamón y Queso', 'cantidad' => 1],
                    ['producto' => 'Helado de Vainilla (2 bochas)', 'cantidad' => 2],
                ],
            ],
        ];

        $createdAt = Carbon::parse('2026-06-22 10:00:00');

        foreach ($ventas as $index => $ventaData) {
            $pedidoCreatedAt = $createdAt->copy()->addHours($index);

            $pedido = Pedido::create([
                'cliente' => $ventaData['cliente'],
                'estado' => 'completado',
                'total' => 0,
                'user_id' => 1,
                'numero_mesa' => $ventaData['numero_mesa'],
                'created_at' => $pedidoCreatedAt,
                'updated_at' => $pedidoCreatedAt,
            ]);

            $totalOriginal = 0;
            $syncData = [];

            foreach ($ventaData['items'] as $item) {
                $producto = $productos->get($item['producto']);
                $syncData[$producto->id] = [
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                ];
                $totalOriginal += $item['cantidad'] * $producto->precio;
            }

            $pedido->productos()->sync($syncData);
            $pedido->update(['total' => $totalOriginal]);

            $metodoPagoId = $ventaData['metodo_pago_id'];
            $descuento = $metodoPagoId === 4 ? 5.00 : 0;
            $totalFinal = $totalOriginal - ($totalOriginal * $descuento / 100);

            Venta::create([
                'pedido_id' => $pedido->id,
                'metodo_pago_id' => $metodoPagoId,
                'total_original' => $totalOriginal,
                'total_final' => $totalFinal,
                'descuento_aplicado' => $descuento,
                'created_at' => $pedidoCreatedAt,
                'updated_at' => $pedidoCreatedAt,
            ]);
        }
    }
}
