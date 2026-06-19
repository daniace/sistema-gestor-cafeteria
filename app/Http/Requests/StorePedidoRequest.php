<?php

namespace App\Http\Requests;

use App\Models\Mesa;
use App\Models\Producto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StorePedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'numero_mesa' => ['required', 'integer', 'exists:mesas,numero'],
            'cliente' => ['required', 'string', 'max:255'],
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
                $mesa = Mesa::where('numero', $this->numero_mesa)->first();

                if (! $mesa || ! $mesa->puedeAsignarPedido()) {
                    throw ValidationException::withMessages([
                        'numero_mesa' => 'La mesa ya está ocupada.',
                    ]);
                }

                foreach ($this->productos as $index => $item) {
                    $producto = Producto::find($item['id']);

                    if ($producto === null || $producto->stock_actual < $item['cantidad']) {
                        $nombre = $producto === null ? "Producto #{$item['id']}" : $producto->descripcion;
                        $disponible = $producto === null ? 0 : $producto->stock_actual;

                        throw ValidationException::withMessages([
                            "productos.{$index}.cantidad" => "Stock insuficiente para {$nombre}. Solicitado: {$item['cantidad']}, disponible: {$disponible}.",
                        ]);
                    }
                }
            },
        ];
    }
}
