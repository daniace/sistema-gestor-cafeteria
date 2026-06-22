<?php

namespace App\Models;

use Database\Factories\PedidoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable('cliente', 'estado', 'total', 'user_id', 'numero_mesa')]

class Pedido extends Model
{
    /** @use HasFactory<PedidoFactory> */
    use HasFactory;

    public function productos(): BelongsToMany
    {
        return $this->belongsToMany(Producto::class)
            ->withPivot('cantidad', 'precio_unitario')
            ->withTimestamps();
    }

    public function mesa(): BelongsTo
    {
        return $this->belongsTo(Mesa::class, 'numero_mesa', 'numero');
    }

    public function venta(): HasOne
    {
        return $this->hasOne(Venta::class);
    }
}
