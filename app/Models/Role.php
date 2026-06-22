<?php

namespace App\Models;

use Database\Factories\ProductoFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable('n')]

class Role extends Model
{
    /** @use HasFactory<ProductoFactory> */
    use HasFactory;

    public function get_name_role_by_id(mixed $id_role): string
    {
        return $this->where('id', $id_role)->value('descripcion');
    }
}

?>
