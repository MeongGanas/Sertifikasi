<?php

namespace Database\Seeders;

use App\Models\Barang;
use App\Models\Pembelian;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'password' => bcrypt('123123')
        ]);

        Barang::factory(10)->create();
        Pembelian::factory(10)->create();
    }
}
