<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $num = fake()->numberBetween(1, 5);
        $topic = 'learn';
        switch ($num) {
            case 1:
                $topic = 'learn';
                break;
            case 2:
                $topic = 'help';
                break;
            case 3:
                $topic = 'parent';
                break;
            case 4:
                $topic = 'event';
                break;
            case 5:
                $topic = 'calendar';
                break;
            default:
                $topic = 'learn';
                break;
        };
        
        $num2 = fake()->numberBetween(1, 6);
        $subject = 'm';
        switch ($num2) {
            case 1:
                $subject = 'm';
                break;
            case 2:
                $subject = 'g';
                break;
            case 3:
                $subject = 'h';
                break;
            case 4:
                $subject = 'l';
                break;
            case 5:
                $subject = 's';
                break;
            case 6:
                $subject = 'o';
                break;
            default:
                $subject = 'm';
                break;
        };

        $num3 = fake()->numberBetween(1, 2);
        $visibility = 'class';
        switch ($num3) {
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
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'date' => ($topic === 'calendar' ? date_format(fake()->dateTimeBetween('-1 week', '+10 week'), 'Y-m-d') : null),
            'subject' => ($topic === 'learn' ? $subject : null),
            'visibility' => ($topic !== 'learn' ? $visibility : null),
            'topic' => $topic
        ];
    }
}
