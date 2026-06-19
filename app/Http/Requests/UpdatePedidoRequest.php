<?php

namespace App\Http\Requests;

use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class UpdatePedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        $pedido = $this->route('pedido');

        return $pedido instanceof Pedido && $pedido->estado === 'pendiente';
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'productos' => ['required', 'array', 'min:1'],
            'productos.*.id' => ['required', 'integer', 'exists:productos,id'],
            'productos.*.cantidad' => ['required', 'integer', 'min:1'],
            'productos.*.precio_unitario' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function after(): array
    {
        return [
            function () {
                $pedido = $this->route('pedido');

                if (! $pedido || $pedido->estado !== 'pendiente') {
                    throw ValidationException::withMessages([
                        'pedido' => 'No se puede modificar un pedido completado.',
                    ]);
                }

                $currentProducts = $pedido->productos()->get()->keyBy('id');

                foreach ($this->productos as $index => $item) {
                    $producto = Producto::find($item['id']);

                    if (! $producto) {
                        continue;
                    }

                    $currentProduct = $currentProducts->get($item['id']);
                    $currentCantidad = $currentProduct ? $currentProduct->pivot->cantidad : 0;
                    $diferencia = $item['cantidad'] - $currentCantidad;

                    if ($diferencia > 0 && $producto->stock_actual < $diferencia) {
                        throw ValidationException::withMessages([
                            "productos.{$index}.cantidad" => "Stock insuficiente para {$producto->descripcion}. Se necesitan {$diferencia} más, disponible: {$producto->stock_actual}.",
                        ]);
                    }
                }
            },
        ];
    }
}
