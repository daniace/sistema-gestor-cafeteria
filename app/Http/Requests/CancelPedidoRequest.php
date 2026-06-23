<?php

namespace App\Http\Requests;

use App\Models\Pedido;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class CancelPedidoRequest extends FormRequest
{
    public function authorize(): bool
    {
        $pedido = $this->route('pedido');

        return $pedido instanceof Pedido && $pedido->estado === 'pendiente';
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [];
    }

    public function after(): array
    {
        return [
            function () {
                $pedido = $this->route('pedido');

                if (! $pedido || $pedido->estado !== 'pendiente') {
                    throw ValidationException::withMessages([
                        'pedido' => 'No se puede cancelar un pedido que no esté pendiente.',
                    ]);
                }
            },
        ];
    }
}
