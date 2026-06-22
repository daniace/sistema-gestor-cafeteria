<?php

namespace App\Models;

use App\States\Mesa\MesaLibre;
use App\States\Mesa\MesaOcupada;
use App\States\Mesa\MesaState;
use Database\Factories\MesaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable('numero', 'capacidad', 'estado')]

class Mesa extends Model
{
    /** @use HasFactory<MesaFactory> */
    use HasFactory;

    private ?MesaState $stateObject = null;

    protected static function booted(): void
    {
        static::retrieved(fn (Mesa $mesa) => $mesa->hydrateState());
        static::saving(fn (Mesa $mesa) => $mesa->syncStateToDatabase());
    }

    public function hydrateState(): void
    {
        $this->stateObject = match ($this->estado) {
            'ocupada' => new MesaOcupada($this),
            default => new MesaLibre($this),
        };
    }

    public function syncStateToDatabase(): void
    {
        if ($this->stateObject !== null) {
            $this->stateObject = $this->estado === 'ocupada'
                ? new MesaOcupada($this)
                : new MesaLibre($this);
        }
    }

    public function state(): MesaState
    {
        if ($this->stateObject === null) {
            $this->hydrateState();
        }

        return $this->stateObject;
    }

    public function puedeAsignarPedido(): bool
    {
        return $this->state()->puedeAsignarPedido();
    }

    public function ocupar(): void
    {
        $this->state()->ocupar();
    }

    public function liberar(): void
    {
        $this->state()->liberar();
    }

    public function pedidos(): HasMany
    {
        return $this->hasMany(Pedido::class, 'numero_mesa', 'numero');
    }

    public function pedidoActivo(): HasOne
    {
        return $this->hasOne(Pedido::class, 'numero_mesa', 'numero')
            ->where('estado', 'pendiente');
    }

    public function ventas(): HasManyThrough
    {
        return $this->hasManyThrough(Venta::class, Pedido::class, 'numero_mesa', 'pedido_id', 'numero', 'id');
    }
}
