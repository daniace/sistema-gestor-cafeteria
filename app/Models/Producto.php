<?php

namespace App\Models;

use Database\Factories\ProductoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable('descripcion', 'categoria', 'stock_actual', 'stock_minimo', 'precio', 'producto_esta_vigente', 'motivo_baja')]

class Producto extends Model
{
    protected $appends = ['puede_eliminar'];

    /** @use HasFactory<ProductoFactory> */
    use HasFactory;

    protected function getPuedeEliminarAttribute(): bool
    {
        return $this->producto_esta_vigente;
    }
}
