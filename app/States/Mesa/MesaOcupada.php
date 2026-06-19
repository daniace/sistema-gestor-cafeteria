<?php

namespace App\States\Mesa;

class MesaOcupada extends MesaState
{
    public function puedeAsignarPedido(): bool
    {
        return false;
    }

    public function ocupar(): void {}

    public function liberar(): void
    {
        $this->mesa->estado = 'libre';
    }
}
