<?php

namespace App\Models;

use Database\Factories\CategoriaProductoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable('nombre_categoria_producto')]
class CategoriaProducto extends Model
{
    protected $table = 'categoria_producto';

    /** @use HasFactory<CategoriaProductoFactory> */
    use HasFactory;

    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class, 'categoria_id');
    }
}
