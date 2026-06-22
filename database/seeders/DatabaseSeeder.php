<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        UserFactory::new()->create([
            'nombre' => 'Admin',
            'apellido' => 'User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'rol' => 'admin',
        ]);

        $this->call([
            MesaSeeder::class,
            MetodoPagoSeeder::class,
        ]);
    }
}
