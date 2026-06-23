<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable('descripcion', 'categoria', 'stock_actual', 'stock_minimo', 'precio', 'producto_esta_vigente', 'motivo_baja')]

class Producto extends Model
{
    protected $appends = ['puede_eliminar'];

    /** @use HasFactoryProductoFactory> */
    use HasFactory;

    public function pedidos(): BelongsToMany
    {
        return $this->belongsToMany(Pedido::class)
            ->withPivot('cantidad', 'precio_unitario')
            ->withTimestamps();
    }

    protected function getPuedeEliminarAttribute(): bool
    {
        return $this->producto_esta_vigente;
    }
}
