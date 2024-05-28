<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $num1 = fake()->randomDigitNotNull();
        $num2 = fake()->randomDigit();

        return [
            'label' => fake()->sentence($num1),
            'count' => $num2,
        ];
    }
}
