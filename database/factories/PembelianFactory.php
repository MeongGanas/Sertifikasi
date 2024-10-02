<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pembelian>
 */
class PembelianFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'barang_id' => fake()->numberBetween(1, 10),
            'jumlah' => fake()->numberBetween(1, 100),
            'total_harga' => fake()->randomFloat(2, 10000, 1000000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
