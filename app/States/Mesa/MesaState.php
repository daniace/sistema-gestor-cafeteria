<?php

namespace App\States\Mesa;

use App\Models\Mesa;

abstract class MesaState
{
    public function __construct(protected Mesa $mesa) {}

    abstract public function puedeAsignarPedido(): bool;

    abstract public function ocupar(): void;

    abstract public function liberar(): void;
}
