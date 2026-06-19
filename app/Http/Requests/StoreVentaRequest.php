<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVentaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'pedido_id' => [
                'required',
                'integer',
                'exists:pedidos,id',
                Rule::unique('ventas', 'pedido_id'),
            ],
            'metodo_pago_id' => ['required', 'integer', 'exists:metodo_pagos,id'],
        ];
    }
}
