<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable('descripcion', 'habilitado', 'descuento')]

class MetodoPago extends Model
{
    public function ventas(): HasMany
    {
        return $this->hasMany(Venta::class);
    }
}
