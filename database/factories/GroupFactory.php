<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $num = fake()->numberBetween(2018, 2024);
        $letter = fake()->randomElement(['A', 'B', 'C', 'D', 'E', 'H']);

        return [
            'name' => $num."-".$letter,
        ];
    }
}
