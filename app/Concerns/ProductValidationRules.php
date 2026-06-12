<?php

namespace App\Concerns;

trait ProductValidationRules
{
    public function productRules(?int $id = null): array
    {
        // valida que los datos sigan el  modelo
        return [
            'descripcion' => ['required', 'string', 'max:255'],
            'categoria' => ['required', 'integer', 'max:255'],
            'stock_actual' => ['required', 'integer', 'max:255'],
            'stock_minimo' => ['required', 'integer', 'max:9999'],
            'precio' => ['required', 'decimal:0,2', 'max:9999.99'],
        ];
    }
}
