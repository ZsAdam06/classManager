<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $deadline = fake()->dateTimeInInterval('-1 week', '+2 week');

        $num = fake()->numberBetween(1, 2);
        $visibility = 'class';
        switch ($num) {
            case 1:
                $visibility = 'class';
                break;
            case 2:
                $visibility = 'school';
                break;
            default:
                $subject = 'class';
                break;
        };

        return [
            'question' => fake()->sentence(),
            'ans' => "",
            'deadline' => $deadline,
            'is_finished' => false,
            'visibility' => $visibility
        ];
    }
}
