<?php

namespace App\Events;

use App\Models\Mesa;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MesaActualizada implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Mesa $mesa) {}

    public function broadcastOn(): array
    {
        return [new Channel('mesas')];
    }

    public function broadcastAs(): string
    {
        return 'mesa.actualizada';
    }
}
