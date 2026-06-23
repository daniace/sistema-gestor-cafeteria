<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            MesaSeeder::class,
            MetodoPagoSeeder::class,
            RolSeeder::class,
        ]);

        UserFactory::new()->create([
            'nombre' => 'Admin',
            'apellido' => 'User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'nro_rol' => 1,
        ]);

    }
}
