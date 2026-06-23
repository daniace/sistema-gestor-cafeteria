<?php

namespace App\Concerns;

trait ProductValidationRules
{
    public function productRules(?int $id = null): array
    {
        // valida que los datos sigan el  modelo
        return [
            'descripcion' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'categoria_id' => ['required', 'integer', 'exists:categoria_producto,id'],
            'stock_actual' => ['required', 'integer', 'max:9999'],
            'stock_minimo' => ['required', 'integer', 'max:9999'],
            'precio' => ['required', 'decimal:0,2', 'max:9999.99'],
        ];
    }
}
