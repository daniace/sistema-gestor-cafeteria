<?php

namespace App\States\Mesa;

class MesaLibre extends MesaState
{
    public function puedeAsignarPedido(): bool
    {
        return true;
    }

    public function ocupar(): void
    {
        $this->mesa->estado = 'ocupada';
    }

    public function liberar(): void {}
}
