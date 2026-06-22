<?php

namespace Database\Seeders;

use App\Models\Mesa;
use Illuminate\Database\Seeder;

class MesaSeeder extends Seeder
{
    public function run(): void
    {
        $mesas = [
            ['numero' => 1, 'capacidad' => 4],
            ['numero' => 2, 'capacidad' => 4],
            ['numero' => 3, 'capacidad' => 2],
            ['numero' => 4, 'capacidad' => 4],
            ['numero' => 5, 'capacidad' => 4],
            ['numero' => 6, 'capacidad' => 6],
            ['numero' => 7, 'capacidad' => 2],
            ['numero' => 8, 'capacidad' => 2],
            ['numero' => 9, 'capacidad' => 4],
            ['numero' => 10, 'capacidad' => 4],
        ];

        foreach ($mesas as $mesa) {
            Mesa::create($mesa);
        }
    }
}
